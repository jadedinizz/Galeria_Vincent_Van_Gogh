from django.db import models

class Categoria(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Obra(models.Model):
    titulo = models.CharField(max_length=200)
    imagem = models.ImageField(upload_to="media/galeria")
    descricao = models.TextField(blank=True, null=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="imagens")


    def __str__(self):
        return self.titulo
