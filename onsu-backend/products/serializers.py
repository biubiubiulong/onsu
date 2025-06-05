# products/serializers.py

from rest_framework import serializers
from .models import Category, Subcategory, Product, ProductImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]
        read_only_fields = ["id", "name"]
        
class SubcategorySerializer(serializers.ModelSerializer):
    # If you want to show the parent category inside the subcategory
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Subcategory
        fields = ["id", "name", "category"]
        read_only_fields = ["id", "name", "category"]

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image"]
        # “image” will be serialized as a URL, e.g. "/media/product_images/xyz.jpg"

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    subcategory = SubcategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "price",
            "is_active",
            "created_at",
            "category", 
            "subcategory", 
            "images",
        ]
        read_only_fields = ["id", "created_at", "images"]
