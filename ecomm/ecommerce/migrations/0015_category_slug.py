# Generated by Django 3.1 on 2020-08-23 20:27

from django.db import migrations
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0014_auto_20200818_2131'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='slug',
            field=django_extensions.db.fields.AutoSlugField(
                blank=True, editable=False, populate_from='name'),
        ),
    ]
