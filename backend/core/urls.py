from rest_framework.routers import DefaultRouter

from .controladores.galeria import GeneroViewSet, ObraViewSet

router = DefaultRouter()
router.register('generos', GeneroViewSet)
router.register('obras', ObraViewSet, basename='obra')

urlpatterns = router.urls
