from django import forms
from django.forms import ModelForm

from ecommerce.models import Product


class ContactForm(forms.Form):
    name = forms.CharField()
    message = forms.CharField(widget=forms.Textarea)

    def send_email(self):
        # send email using the self.cleaned_data dictionary
        pass

class NameForm(forms.Form):
    your_name = forms.CharField(label='Your name', max_length=100)


class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = '__all__'
