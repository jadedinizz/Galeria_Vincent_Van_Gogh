from django.urls import path
from . import views

urlpatterns = [
    path("index/", views.index, name="index"),
    path("imagem/nova/", views.criar_imagem, name="criar_imagem"),
    path("imagem/<int:pk>/", views.detalhe_imagem, name="detalhe_imagem"),
    path("imagem/<int:pk>/editar/", views.editar_imagem, name="editar_imagem"),
    path("imagem/<int:pk>/deletar/", views.deletar_imagem, name="deletar_imagem"),
]
