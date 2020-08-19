import graphene
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.utils import timezone
from graphene_file_upload.scalars import Upload
from uuid import uuid4

from ecommerce.models import Purchase, Shipping, Cart, Billing, ProductPurchaseThroughModel, ProductCartThroughModel, \
    Product, Category
from ecommerce.schema.types import CartType, ProductType, UserType, ShippingType, BillingType, CategoryType


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


class ProductMutationInput(graphene.InputObjectType):
    name = graphene.String()
    id = graphene.ID()
    price = graphene.Float(required=False)
    description = graphene.String()
    qty_in_stock = graphene.Int()
    slug = graphene.String()
    sku_number = graphene.String()
    category = graphene.String()
    product_image = Upload()


class UpsertCategoryMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        name = graphene.String()

    category = graphene.Field(CategoryType)

    def mutate(self, info, id=None, name=None):
        if not id:
            category = Category()
        else:
            category = Category.objects.get(pk=id)
        if name:
            category.name = name
        category.save()
        return UpsertCategoryMutation(category=category)


class UpsertProductMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        input = ProductMutationInput()

    # The class attributes define the response of the mutation
    product = graphene.Field(ProductType)

    def mutate(
            self,
            info,
            input,
    ):
        user = info.context.user
        if not user.is_authenticated or not user.is_superuser:
            return UpsertProductMutation(product=None)
        if not input.id:
            product = Product()
        else:
            product = Product.objects.get(pk=input.id)
        if input.name:
            product.name = input.name
        if input.price:
            product.price = input.price
        if input.description:
            product.description = input.description
        if input.qty_in_stock:
            product.qty_in_stock = input.qty_in_stock
        if input.slug:
            product.slug = input.slug
        if input.sku_number:
            product.sku_number = input.sku_number
        if input.category:
            product.category = Category.objects.get(pk=input.category)
        if input.product_image:
            product.product_pic = input.product_image

        product.save()
        try:
            product.save()
        except IntegrityError as e:
            raise Exception(
                f'{input.slug} as a slug already exists for another product.')
        # Notice we return an instance of this mutation
        return UpsertProductMutation(product=product)


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
        if not info.context.user.is_authenticated:
            user = User.objects.create(username=uuid4())
            user.user_profile.is_guest_user = True
            user.user_profile.save()
            login(info.context, user=user)
        else:
            user = info.context.user
        cart, created = Cart.objects.get_or_create(user=user)
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
    update_product = UpsertProductMutation.Field()
    sign_out = SignOutMutation.Field()
    sign_in = SignInMutation.Field()
    upload_product_picture = UploadMutation.Field()
    add_product_to_cart = AddProductToCartMutation.Field()
    purchase = PurchaseMutation.Field()
    update_shipping_billing = UpdateShippingBillingMutation.Field()
    user_edit = UserEditMutation.Field()
    add_update_category = UpsertCategoryMutation.Field()
