from rest_framework import serializers

from Appis.web import models

# Serializer

class HomeSliderSerializer(serializers.ModelSerializer):
    """
        首页轮播图
    """
    class Meta:
        model = models.HomeSlider
        fields = '__all__'