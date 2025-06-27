from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Subcategory
from .serializers import ProductSerializer
from rest_framework.pagination import PageNumberPagination

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProductByIdView(APIView):
    def get(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            serializer = ProductSerializer(product, context={"request": request})
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

class ProductsByCategoryView(APIView):
    def get(self, request, category_id):
        products = Product.objects.filter(category_id=category_id)
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(products, request)

        serializer = ProductSerializer(result_page, many=True, context={"request": request})
        return paginator.get_paginated_response(serializer.data)

class ProductsByCategoryAndSubcategoryView(APIView):
    def get(self, request, category_id, subcategory_name):
        try:
            subcategory = Subcategory.objects.get(
                category_id=category_id,
                name=subcategory_name
            )
        except Subcategory.DoesNotExist:
            return Response(
                {"error": "Subcategory not found for the given category."},
                status=status.HTTP_404_NOT_FOUND
            )

        products = Product.objects.filter(subcategory=subcategory)
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(products, request)

        serializer = ProductSerializer(result_page, many=True, context={"request": request})
        return paginator.get_paginated_response(serializer.data)