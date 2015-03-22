# Third Party
from rest_framework import serializers

# Ours
import models
from apps.coffee.models import Coffee


class RoastSerializer(serializers.ModelSerializer):

    coffee = serializers.PrimaryKeyRelatedField(queryset=Coffee.objects.all())

    class Meta:
        model = models.Roast
        fields = ('id', 'coffee', 'name', 'created',)