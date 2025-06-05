# products/admin.py

from django.contrib import admin
from .models import Product, ProductImage

#
# Inline admin for ProductImage
#
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    readonly_fields = ("image_tag",)

    def image_tag(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="height: 80px;"/>'
        return ""
    image_tag.allow_tags = True
    image_tag.short_description = "Preview"

#
# Admin registration for Product (only once!)
#
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price", "is_active", "created_at")
    list_filter  = ("is_active",)
    search_fields = ("name",)
    inlines = [ProductImageInline]

#
# Admin registration for ProductImage (only once!)
#
@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "image")
    list_filter  = ("product",)
    search_fields = ("product__name",)
