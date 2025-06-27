from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductByIdView, ProductsByCategoryView, ProductsByCategoryAndSubcategoryView

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")

urlpatterns = [
    path("", include(router.urls)),
    path('products/<int:product_id>/', ProductByIdView.as_view()),
    path('products/category/<int:category_id>/', ProductsByCategoryView.as_view()),
    path('products/category/<int:category_id>/subcategory/<str:subcategory_name>/', ProductsByCategoryAndSubcategoryView.as_view())
]