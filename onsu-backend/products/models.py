from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = 'Categories'
    
    def __str__(self):
        return self.name

class Subcategory(models.Model):
    category = models.ForeignKey(
        Category,
        related_name="subcategories",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ("category", "name")
        verbose_name_plural = "Subcategories"

    def __str__(self):
        return f"{self.category.name} → {self.name}"

class Product(models.Model):
    name = models.CharField(max_length=200, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    category = models.ForeignKey(
        Category,
        related_name="products",
        on_delete=models.PROTECT
    )
    subcategory = models.ForeignKey(
        Subcategory,
        related_name="products",
        on_delete=models.PROTECT,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="product_images/")

    def __str__(slef):
        return f"{slef.product.name} - {slef.image.name}"