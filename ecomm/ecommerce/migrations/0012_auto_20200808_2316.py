# Generated by Django 3.0.8 on 2020-08-08 23:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0011_auto_20200808_2315'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='profile_pic',
            new_name='product_pic',
        ),
    ]
