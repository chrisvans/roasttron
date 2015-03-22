# Third Party
from rest_framework import serializers

# Ours
import models


class TempPointSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.TempPoint
        fields = ('id', 'roast', 'reading', 'time', 'created',)