import models
import serializers

# Third Party
from rest_framework import viewsets


class TempPointViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows temppoints to be viewed or edited.
    """
    queryset = models.TempPoint.objects.all()
    serializer_class = serializers.TempPointSerializer