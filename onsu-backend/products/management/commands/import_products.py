# products/management/commands/import_products.py

import csv
import os
import shutil
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from products.models import Category, Subcategory, Product, ProductImage

class Command(BaseCommand):
    help = (
        "name,price,price_id,is_active,category,subcategory,"
        "features,functions,specifications,image_1,image_2…"
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "csv_file",
            type=str,
            help="Path to the CSV file (e.g. products_to_import.csv)",
        )
        parser.add_argument(
            "--images-dir",
            type=str,
            default=None,
            help=(
                "Path to the folder containing image files. "
                "Defaults to './import_images' in your project root."
            ),
        )

    def handle(self, *args, **options):
        csv_path = options["csv_file"]
        images_dir = options["images_dir"] or os.path.join(settings.BASE_DIR, "import_images")

        if not os.path.isfile(csv_path):
            raise CommandError(f"CSV file not found: {csv_path}")
        if not os.path.isdir(images_dir):
            raise CommandError(f"Images folder not found: {images_dir}")

        created_count = 0
        updated_count = 0

        with open(csv_path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row_num, row in enumerate(reader, start=2):
                name = row.get("name", "").strip()
                price_str = row.get("price", "").strip()
                price_id = row.get("price_id", "").strip()
                is_active = row.get("is_active", "").strip().lower() in ("1", "true", "yes")
                category_name = row.get("category", "").strip()
                subcategory_name = row.get("subcategory", "").strip()

                if not (name and price_id and category_name):
                    self.stderr.write(f"[Line {row_num}] name/price_id/category required; skipping.")
                    continue

                try:
                    price = float(price_str)
                except ValueError:
                    self.stderr.write(f"[Line {row_num}] Invalid price '{price_str}' for '{name}', skipping.")
                    continue

                # Get or create Category
                category_obj, _ = Category.objects.get_or_create(name=category_name)
                
                # Get or create Subcategory (if provided)
                subcategory_obj = None
                if subcategory_name:
                    subcategory_obj, _ = Subcategory.objects.get_or_create(
                        category=category_obj, name=subcategory_name
                    )

                product, created = Product.objects.update_or_create(
                    name=name,
                    defaults={
                        "price":        price,
                        "price_id":    price_id,
                        "is_active":    is_active,
                        "category":     category_obj,
                        "subcategory":  subcategory_obj,
                    },
                )
                if created:
                    created_count += 1
                    self.stdout.write(self.style.SUCCESS(f"Created Product: '{name}'"))
                else:
                    updated_count += 1
                    self.stdout.write(self.style.WARNING(f"Updated Product: '{name}'"))

                # parse and assign features
                raw_feats = row.get("features","").strip()
                product.features = [
                    f.strip() for f in raw_feats.split("|") if f.strip()
                ]

                # parse and assign functions
                raw_funcs = row.get("functions","").strip()
                product.functions = [
                    fn.strip() for fn in raw_funcs.split("|") if fn.strip()
                ]

                # parse and assign specifications (key:value;key2:value2;…)
                raw_specs = row.get("specifications","").strip()
                specs = []
                for item in raw_specs.split(";"):
                    if ":" in item:
                        k, v = item.split(":", 1)
                        specs.append({"key": k.strip(), "value": v.strip()})
                product.specifications = specs
                
                # save JSONField updates
                product.save()

                # Remove any existing images
                for img in product.images.all():
                    img_path = img.image.path
                    if os.path.isfile(img_path):
                        os.remove(img_path)
                    img.delete()

                # Loop over columns like image_1, image_2, …
                for key, filename in row.items():
                    if not key.startswith("image_"):
                        continue
                    filename = (filename or "").strip()
                    if not filename:
                        continue

                    source_path = os.path.join(images_dir, filename)
                    if not os.path.isfile(source_path):
                        self.stderr.write(
                            self.style.ERROR(f"[Line {row_num}] File not found: {source_path} (skipping).")
                        )
                        continue

                    # Copy into MEDIA_ROOT/product_images/
                    dest_dir = os.path.join(settings.MEDIA_ROOT, "product_images")
                    os.makedirs(dest_dir, exist_ok=True)
                    dest_path = os.path.join(dest_dir, filename)
                    shutil.copy2(source_path, dest_path)

                    # Create a ProductImage
                    rel_path = os.path.join("product_images", filename)
                    ProductImage.objects.create(product=product, image=rel_path)
                    self.stdout.write(self.style.SUCCESS(
                        f"  ↳ Attached image '{filename}' to '{name}'"
                    ))

        self.stdout.write(self.style.SUCCESS(
            f"Import complete: {created_count} created, {updated_count} updated."
        ))
