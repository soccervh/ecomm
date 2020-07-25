from django.conf import settings
from django.db import models

# Create your models here.
from django.forms import ModelForm


class Product(models.Model):
    name = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField()
    sku_number = models.IntegerField()
    qty_in_stock = models.IntegerField()
    category = models.ForeignKey("Category", on_delete=models.CASCADE)
    slug = models.SlugField(unique=True)
    profile_pic = models.ImageField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} product"


class Category(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        # Gives the proper plural name for admin
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class ProductCartThroughModel(models.Model):
    cart = models.ForeignKey("Cart",
                             on_delete=models.CASCADE,
                             related_name="cart_products")
    product = models.ForeignKey("Product",
                                on_delete=models.CASCADE,
                                related_name="cart_products")
    quantity = models.IntegerField()


class Cart(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    products = models.ManyToManyField(
        "Product",
        through='ProductCartThroughModel',
    )


class Billing(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    address = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    state = models.CharField(max_length=2)
    zip = models.CharField(max_length=10)


class Shipping(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=64)
    address = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    state = models.CharField(max_length=2)
    zip = models.CharField(max_length=10)


class Purchase(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    billing = models.ForeignKey("Billing",
                                on_delete=models.CASCADE,
                                blank=True,
                                null=True)

    shipping = models.ForeignKey("Shipping",
                                 on_delete=models.CASCADE,
                                 blank=True,
                                 null=True)
    products = models.ManyToManyField(
        "Product",
        through='ProductPurchaseThroughModel',
    )

    def __str__(self):
        return f"{self.user} -- {self.id}"


class ProductPurchaseThroughModel(models.Model):
    purchase = models.ForeignKey("Purchase",
                                 on_delete=models.CASCADE,
                                 related_name='purchase_products')
    product = models.ForeignKey("Product",
                                on_delete=models.CASCADE,
                                related_name='purchase_products')
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
