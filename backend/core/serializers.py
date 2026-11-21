from rest_framework import serializers

from .models import Genero, Obra


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = ('id', 'nome')


class ObraSerializer(serializers.ModelSerializer):
    genero_nome = serializers.CharField(source='genero.nome', read_only=True, default=None)
    imagem_url = serializers.SerializerMethodField()

    def get_imagem_url(self, obra):
        return obra.imagem.url if obra.imagem else None

    class Meta:
        model = Obra
        fields = ('id', 'titulo', 'imagem', 'imagem_url', 'date', 'genero', 'genero_nome')
        extra_kwargs = {
            'imagem': {'write_only': True},
            'genero': {'required': True, 'allow_null': False},
        }
