# Generated by Django 3.0.7 on 2020-07-03 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0002_auto_20200629_2046'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'Categories'},
        ),
        migrations.AddField(
            model_name='product',
            name='slug',
            field=models.SlugField(default='poop'),
            preserve_default=False,
        ),
    ]
