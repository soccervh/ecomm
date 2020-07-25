from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.views.decorators.http import require_http_methods
from django.views.generic import TemplateView, ListView, DetailView, FormView

from ecommerce.forms import ContactForm, NameForm, ProductForm
from ecommerce.models import Product, Category


@require_http_methods(["GET", "POST"])
def product_detail(request):
    product_list = Product.objects.all()
    return render(request, 'detail.html',{'product_list': product_list})

class ProductList(ListView):
    model = Product
    template_name = 'listview.html'
    context_object_name = 'poops'

class ProductDetail(DetailView):
    model = Product
    template_name = 'detailview.html'

class AboutTemplate(TemplateView):
    template_name = 'about.html'

    def get_context_data(self, **kwargs):
        return {'product':Product.objects.first(), 'sum': 4 + 9, 'request': self.request}

class ProductFormView(FormView):
    form_class = ProductForm
    template_name = 'productentry.html'
    success_url = '/thanks/'

    def form_valid(self, form):
        product = form.cleaned_data
        Product.objects.create(**product)


        return super().form_valid(form)


class ContactView(FormView):
    template_name = 'contact.html'
    form_class = ContactForm
    success_url = '/thanks/'

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        form.send_email()
        return super().form_valid(form)

class NameForm2(FormView):
    template_name = 'name.html'
    form_class = NameForm
    success_url = '/thanks/'

class IndexTemplate(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexTemplate, self).get_context_data(**kwargs)
        context['poop'] = 'this is the index page'
        return context



