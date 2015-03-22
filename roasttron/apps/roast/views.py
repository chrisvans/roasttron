import models
import serializers

# Third Party
from rest_framework import viewsets


class RoastViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows roastss to be viewed or edited.
    """
    queryset = models.Roast.objects.all()
    serializer_class = serializers.RoastSerializer