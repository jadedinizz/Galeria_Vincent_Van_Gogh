from django.shortcuts import render, redirect, get_object_or_404
from .models import Obra, Genero
from .forms import ImagemForm

def index(request):

    generos = Genero.objects.all()

    genero_id = request.GET.get('genero')
    if genero_id:
        obras = Obra.objects.filter(genero_id=genero_id)
    else:
        obras = Obra.objects.all()
        generos = Genero.objects.all()
    return render(request, "core/index.html", {"obras": obras, "generos": generos})
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
