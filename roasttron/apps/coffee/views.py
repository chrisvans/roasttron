import models
import serializers

# Third Party
from rest_framework import viewsets


class CoffeeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows coffees to be viewed or edited.
    """
    queryset = models.Coffee.objects.all()
    serializer_class = serializers.CoffeeSerializer
