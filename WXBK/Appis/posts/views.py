
from django import views
from django.shortcuts import render

from rest_framework import filters, pagination
from rest_framework import mixins, viewsets, views, status, generics
from rest_framework.response import Response
from rest_framework.decorators import list_route
from django_filters.rest_framework.backends import DjangoFilterBackend

from Appis.posts import models
from Appis.posts import serializers

# Create your views here.

class BlogViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    """
        活动讯息
    """
    queryset = models.Blog.objects.all()
    serializer_class = serializers.BlogSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filter_fields = ('status', )
    ordering_fields = ('add_time', )
    pagination_class = pagination.LimitOffsetPagination

# 在本地展示 博客
class BlogView(views.View):
    def get(self, request, id):
        blog = models.Blog.objects.filter(id= id)
        return render(request, 'Blog/blog.html', {
            'blog': blog[0]
        })