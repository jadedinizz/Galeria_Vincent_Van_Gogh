from django import forms
from .models import Obra

class ImagemForm(forms.ModelForm):
    class Meta:
        model = Obra
        fields = ['titulo', 'imagem', 'descricao', 'categoria']
