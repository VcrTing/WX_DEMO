from rest_framework import serializers

from Appis.member import models

# Serializer

class MemberSerializer(serializers.ModelSerializer):
    """
        微信会员
    """
    class Meta:
        model = models.Member
        fields = '__all__'

class MemberMsgSerializer(serializers.ModelSerializer):
    """
        微信会员永久资料
    """
    class Meta:
        model = models.MemberMsg
        fields = '__all__'