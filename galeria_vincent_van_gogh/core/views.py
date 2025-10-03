from django.shortcuts import render, redirect, get_object_or_404
from .models import Obra, Categoria
from .forms import ImagemForm

def index(request):
    categoria_id = request.GET.get('categoria')
    if categoria_id:
        obras = Obra.objects.filter(categoria_id=categoria_id)
    else:
        obras = Obra.objects.all()
    categorias = Categoria.objects.all()
    return render(request, "core/index.html", {"obras": obras, "categorias": categorias})

def detalhe_imagem(request, pk):
    imagem = get_object_or_404(Obra, pk=pk)
    return render(request, "core/detalhe.html", {"imagem": imagem})

def criar_imagem(request):
    if request.method == "POST":
        form = ImagemForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("index")
    else:
        form = ImagemForm()
    return render(request, "core/form_image.html", {"form": form, "editar": False})

def editar_imagem(request, pk):
    imagem = get_object_or_404(Obra, pk=pk)
    if request.method == "POST":
        form = ImagemForm(request.POST, request.FILES, instance=imagem)
        if form.is_valid():
            form.save()
            return redirect("index")
    else:
        form = ImagemForm(instance=imagem)
    return render(request, "core/form_imagem.html", {"form": form, "editar": True})

def deletar_imagem(request, pk):
    imagem = get_object_or_404(Obra, pk=pk)
    if request.method == "POST":
        imagem.delete()
        return redirect("index")
    return render(request, "core/confirmar_delete.html", {"imagem": imagem})
