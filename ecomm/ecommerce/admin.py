from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Product, Category, Cart, ProductCartThroughModel, Purchase, ProductPurchaseThroughModel


@admin.register(ProductCartThroughModel)
class ProductCartThroughModelAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity')
    list_filter = ['cart', 'product']


@admin.register(ProductPurchaseThroughModel)
class ProductPurchaseThroughModelAdmin(admin.ModelAdmin):
    list_display = ('purchase', 'product', 'quantity', 'price')
    list_filter = ['purchase', 'product']


admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(Purchase)
