from rest_framework import serializers

from Appis.posts import models

# Serializer

class BlogSerializer(serializers.ModelSerializer):
    """
        活动讯息
    """
    class Meta:
        model = models.Blog
        fields = '__all__'