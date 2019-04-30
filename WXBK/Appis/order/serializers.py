from rest_framework import serializers

from . import models

from Extra.utils import union

# Serializer

class OrderSerializer(serializers.ModelSerializer):
    """
        订单
    """
    # order_number = serializers.SerializerMethodField()

    class Meta:
        model = models.Order
        fields = '__all__'
        deepth = 1

    # def get_order_number(self, order):
        # return union.order_number()

class OrderBelongSerializer(serializers.ModelSerializer):
    """
        订单记录
    """
    class Meta:
        model = models.OrderBelong
        fields = '__all__'