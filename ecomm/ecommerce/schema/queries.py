import graphene

from ecommerce.models import Product, Category, Cart, Billing, Shipping
from ecommerce.schema.types import UserType, CategoryType, ProductType, CartType, BillingType, ShippingType


class Query(object):
    current_user = graphene.Field(UserType)
    all_categories = graphene.List(CategoryType)
    all_products = graphene.List(ProductType,
                                 category_slug=graphene.String(required=False))
    get_product = graphene.Field(ProductType,
                                 id=graphene.Int(),
                                 slug=graphene.String())
    cart = graphene.Field(CartType)
    billing_info = graphene.Field(BillingType, id=graphene.Int())
    shipping_info = graphene.Field(ShippingType, id=graphene.Int())

    # our Resolver method takes the GraphQL context (root, info) as well as
    # Argument (name) for the Field and returns data for the query Response
    def resolve_current_user(self, info):
        if info.context.user.is_authenticated:
            return info.context.user
        return None

    def resolve_get_product(self, info, id=None, slug=None):
        if id:
            return Product.objects.get(pk=id)

        return Product.objects.get(slug=slug)

    def resolve_all_categories(self, info, **kwargs):
        return Category.objects.all()

    def resolve_all_products(self, info, category_slug=None, **kwargs):
        # We can easily optimize query count in the resolve method
        if category_slug is None:
            return Product.objects.select_related('category').all()
        return Product.objects.select_related('category').filter(
            category__slug=category_slug)

    def resolve_cart(self, info, **kwargs):
        if info.context.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=info.context.user)

            # cart.products = ProductCartThroughModel.objects.filter(cart=cart,)
            #save the ProductCartThroughModel

            return cart
        return None

    def resolve_billing_info(self, info, id=None):
        if id:
            return Billing.objects.get(pk=id)

    def resolve_shipping_info(self, info, id=None):
        if id:
            return Shipping.objects.get(pk=id)
