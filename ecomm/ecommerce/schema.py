import graphene
from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.models import User
from django.utils import timezone
from graphene import String
from graphene_file_upload.scalars import Upload

from graphene_django.types import DjangoObjectType

from .models import Category, Product, Cart, ProductCartThroughModel, ProductPurchaseThroughModel, Purchase, Shipping, \
    Billing

import logging

logger = logging.getLogger('django')


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
        logger.info(ProductCartThroughModel.objects.filter(cart=self, ))
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


class Query(object):
    current_user = graphene.Field(UserType)
    all_categories = graphene.List(CategoryType)
    all_products = graphene.List(ProductType)
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

    def resolve_all_products(self, info, **kwargs):
        # We can easily optimize query count in the resolve method
        return Product.objects.select_related('category').all()

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


class UserEditMutation(graphene.Mutation):
    class Arguments:
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()

    user_edit = graphene.Field(UserType)

    def mutate(self,
               info,
               first_name=None,
               last_name=None,
               email=None,
               **kwargs):
        user = info.context.user
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if email:
            user.email = email
        user.save()
        return UserEditMutation(user_edit=user)


class ProductMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        name = graphene.String()
        id = graphene.ID(required=True)
        price = graphene.Float(required=False)

    # The class attributes define the response of the mutation
    product = graphene.Field(ProductType)

    def mutate(self, info, id, price=None, name=None):
        user = info.context.user
        if not user.is_authenticated or not user.is_superuser:
            return ProductMutation(product=None)
        product = Product.objects.get(pk=id)
        if name:
            product.name = name
        if price:
            product.price = price
        product.save()
        # Notice we return an instance of this mutation
        return ProductMutation(product=product)


class SignInMutation(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String()
        password = graphene.String()

    def mutate(self, info, username, password):
        user = authenticate(username=username, password=password)
        if user is not None:
            login(info.context, user)
            return SignInMutation(user=user)


class SignOutMutation(graphene.Mutation):
    current_user = graphene.Field(UserType)

    def mutate(self, info):

        user = info.context.user
        if user.is_authenticated or user.is_superuser:
            logout(info.context)

        current_user = None
        if info.context.user.is_authenticated:
            current_user = info.context.user

        return SignOutMutation(current_user=current_user)


class UploadMutation(graphene.Mutation):
    class Arguments:
        file = Upload(required=True)
        id = graphene.ID()

    product = graphene.Field(ProductType)

    def mutate(self, info, file, id, **kwargs):
        # do something with your file\
        product = Product.objects.get(pk=id)
        product.product_pic = file
        product.save()
        return UploadMutation(product=product)


class AddProductToCartMutation(graphene.Mutation):
    class Arguments:
        product_id = graphene.ID(required=True)
        quantity = graphene.Int()

    #this is what is returned
    cart = graphene.Field(CartType)
    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, product_id, **kwargs):
        quantity = kwargs.get('quantity', 1)
        product = Product.objects.get(pk=product_id)
        success = False
        message = ""
        cart, created = Cart.objects.get_or_create(user=info.context.user)
        # tip: info.context.user  is the USER as a User Model
        # get the Cart for the user

        if quantity == 0:
            ProductCartThroughModel.objects.get(
                product=product,
                cart=cart,
            ).delete()
        else:
            # add the product to the a cart by using ProductCartThroughModel
            # this will also let you specify the quantity
            # through_model = ProductCartThroughModel.objects.create(product=product, cart=cart, quantity=quantity)
            # cart.products.add(through_model)
            if product.qty_in_stock >= quantity:
                success = True
                pic, pic_created = ProductCartThroughModel.objects.get_or_create(
                    product=product,
                    cart=cart,
                    defaults={'quantity': quantity})

                if not pic_created:
                    pic.quantity = quantity
                    pic.save()
            else:
                message = "We dont have that many products"

        return AddProductToCartMutation(cart=cart,
                                        success=success,
                                        message=message)


class PurchaseMutation(graphene.Mutation):
    class Arguments:
        billing_id = graphene.ID(required=True)
        shipping_id = graphene.ID(required=True)

    cart = graphene.Field(CartType)

    def mutate(self, info, billing_id, shipping_id, **kwargs):
        billing = Billing.objects.get(pk=billing_id)
        shipping = Shipping.objects.get(pk=shipping_id)
        cart = Cart.objects.get(user=info.context.user)
        purchase = Purchase.objects.create(user=info.context.user,
                                           billing=billing,
                                           shipping=shipping)
        for product_cart in cart.cart_products.all():
            purchase_cart = ProductPurchaseThroughModel.objects.create(
                product=product_cart.product,
                purchase=purchase,
                quantity=product_cart.quantity,
                price=product_cart.product.price,
            )
            product_cart.product.qty_in_stock = product_cart.product.qty_in_stock - product_cart.quantity
            product_cart.product.save()
        billing.last_used = timezone.now()
        shipping.last_used = timezone.now()
        billing.save()
        shipping.save()

        cart.delete()

        return PurchaseMutation()


class ShippingInputType(graphene.InputObjectType):
    name = graphene.String(required=True)
    phone = graphene.String(required=True)
    address = graphene.String(required=True)
    city = graphene.String(required=True)
    zip = graphene.String(required=True)
    state = graphene.String(required=True)


class BillingInputType(graphene.InputObjectType):
    name = graphene.String(required=True)
    phone = graphene.String(required=True)
    address = graphene.String(required=True)
    city = graphene.String(required=True)
    zip = graphene.String(required=True)
    state = graphene.String(required=True)


class UpdateShippingBillingMutation(graphene.Mutation):
    class Arguments:
        shipping = ShippingInputType()
        billing = BillingInputType()

    shipping = graphene.Field(ShippingType)
    billing = graphene.Field(BillingType)

    def mutate(self, info, shipping=None, billing=None, **kwargs):
        ships = bills = None
        if shipping:
            ships = Shipping.objects.create(name=shipping.name,
                                            address=shipping.address,
                                            phone=shipping.phone,
                                            city=shipping.city,
                                            zip=shipping.zip,
                                            state=shipping.state,
                                            user=info.context.user)

        if billing:
            bills = Billing.objects.create(name=billing.name,
                                           address=billing.address,
                                           phone=billing.phone,
                                           city=billing.city,
                                           zip=billing.zip,
                                           state=billing.state,
                                           user=info.context.user)
        return UpdateShippingBillingMutation(shipping=ships, billing=bills)


class Mutation(graphene.ObjectType):
    update_product = ProductMutation.Field()
    sign_out = SignOutMutation.Field()
    sign_in = SignInMutation.Field()
    upload_product_picture = UploadMutation.Field()
    add_product_to_cart = AddProductToCartMutation.Field()
    purchase = PurchaseMutation.Field()
    update_shipping_billing = UpdateShippingBillingMutation.Field()
    user_edit = UserEditMutation.Field()