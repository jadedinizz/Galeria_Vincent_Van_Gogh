from rest_framework import serializers, viewsets

from ..models import Genero
from ..serializers import GeneroSerializer, ObraSerializer
from ..services import listar_obras


class FiltroObrasSerializer(serializers.Serializer):
    genero = serializers.IntegerField(required=False, min_value=1, max_value=2**63 - 1)


class GeneroViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Genero.objects.order_by('nome', 'pk')
    serializer_class = GeneroSerializer


class ObraViewSet(viewsets.ModelViewSet):
    serializer_class = ObraSerializer

    def get_queryset(self):
        if self.action == 'list':
            filtro = FiltroObrasSerializer(data=self.request.query_params)
            filtro.is_valid(raise_exception=True)
            return listar_obras(filtro.validated_data.get('genero'))
        return listar_obras()
