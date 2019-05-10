import json

from django_filters.rest_framework.backends import DjangoFilterBackend

from rest_framework import filters, pagination
from rest_framework import mixins, viewsets, views, status
from rest_framework.response import Response
from rest_framework.decorators import list_route

from Appis.order import models
from Appis.order import serializers
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from Extra.utils.tokens import create_token, verify_token

# View
class OrderViewSet(viewsets.ModelViewSet):
    """
        订单
    """
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
    filter_backends = (DjangoFilterBackend, )
    filter_fields = ('member', 'status')
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    ordering_fields = ('id', )

class OrderBelongViewSet(viewsets.ModelViewSet):
    """
        订单记录
    """
    queryset = models.OrderBelong.objects.all()
    serializer_class = serializers.OrderBelongSerializer