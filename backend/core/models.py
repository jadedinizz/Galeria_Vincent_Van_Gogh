from django.db import models

class Genero(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Obra(models.Model):
    titulo = models.CharField(max_length=200)
    imagem = models.ImageField(upload_to="media/galeria")
    date = models.DateField(blank=True, null=True)
    genero = models.ForeignKey(Genero, on_delete=models.CASCADE, related_name="obras")


    def __str__(self):
        return self.titulo
