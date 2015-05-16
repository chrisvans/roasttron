# Third Party
from rest_framework import serializers

# Ours
import models
from apps.coffee.models import Coffee


class RoastSerializer(serializers.ModelSerializer):

    coffee = serializers.PrimaryKeyRelatedField(queryset=Coffee.objects.all())
    profile_data = serializers.SerializerMethodField()

    # This is just for testing, replace this with a cached JSON object
    def get_profile_data(self, obj):
        data = []
        for point in obj.temppoint_set.all().order_by('time'):
            data.append({'x': point.time, 'y': point.reading})

        return data

    class Meta:
        model = models.Roast
        fields = ('id', 'coffee', 'name', 'created', 'profile_data')