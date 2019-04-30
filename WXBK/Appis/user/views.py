import random

from django.db.models import Q
from django.forms import model_to_dict
from django.http import QueryDict, JsonResponse

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

from rest_framework.response import Response
from rest_framework import mixins, viewsets, permissions, status
from rest_framework.authentication import SessionAuthentication

User = get_user_model()
class CustomBackend(ModelBackend):
    """
        自定义用户验证
    """
    def authenticate(self, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(Q(username = username)|Q(email = username))
            if user.check_password(password):
                return user
        except Exception as e:
            return None

# Create your views here.
class UserViewSet():
    pass