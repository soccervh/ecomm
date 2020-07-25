"""ecomm URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView
from django.conf import settings
from django.conf.urls.static import static
from ecommerce.forms import ContactForm
from ecommerce.views import product_detail, ProductList, ProductDetail,\
    AboutTemplate, ContactView, NameForm2, \
    ProductFormView
from graphene_file_upload.django import FileUploadGraphQLView

urlpatterns =[
    path('admin/', admin.site.urls),

    path("graphql/", csrf_exempt(FileUploadGraphQLView.as_view(graphiql=True))),
    path('detail.html', product_detail),
    path('classlistview.html', ProductList.as_view()),
    path('products/<slug>/', ProductDetail.as_view()),
    path('about', AboutTemplate.as_view()),
    path('contact', ContactView.as_view()),
    path('thanks/', TemplateView.as_view(template_name='thanks.html')),
    path('thanksfirstname/', NameForm2.as_view()),
    path('productentry/', ProductFormView.as_view())   ,

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [ re_path('.*', TemplateView.as_view(template_name='index.html')),
                                                                      re_path('', TemplateView.as_view(template_name='index.html')),]
