from .models import Obra


def listar_obras(genero_id=None):
    obras = Obra.objects.select_related('genero').order_by('titulo', 'pk')
    if genero_id is not None:
        obras = obras.filter(genero_id=genero_id)
    return obras
