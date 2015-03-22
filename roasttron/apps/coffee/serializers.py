# Ours
import models

# Third Party
from rest_framework import serializers


class CoffeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Coffee
        fields = ('id', 'name', 'slug',)