import graphene
from django.contrib.auth.models import User
from graphene_django import DjangoObjectType

from ecommerce.models import Cart, ProductCartThroughModel, Shipping, Billing, Purchase, Product, Category


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category


class ProductType(DjangoObjectType):
    class Meta:
        model = Product

    def resolve_product_pic(self, info, **kwargs):
        if self.product_pic:
            return self.product_pic.url


class UserType(DjangoObjectType):
    class Meta:
        model = User

    def resolve_billing_set(self, info):
        return self.billing_set.order_by('-last_used')[:5]

    def resolve_shipping_set(self, info):
        return self.shipping_set.order_by('-last_used')[:5]


class ProductThroughModelType(DjangoObjectType):
    class Meta:
        model = ProductCartThroughModel


class CartType(DjangoObjectType):
    products = graphene.List(ProductThroughModelType)

    class Meta:
        model = Cart

    def resolve_products(self, info):
        return ProductCartThroughModel.objects.filter(cart=self, )


class ShippingType(DjangoObjectType):
    class Meta:
        model = Shipping


class BillingType(DjangoObjectType):
    class Meta:
        model = Billing


class PurchaseType(DjangoObjectType):
    shipping = graphene.Field(ShippingType)
    billing = graphene.Field(BillingType)

    class Meta:
        model = Purchase
