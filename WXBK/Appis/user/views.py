import random

from django.db.models import Q
from django.forms import model_to_dict
from django.http import QueryDict, JsonResponse

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

from rest_framework.response import Response
from rest_framework import mixins, viewsets, permissions, status
from rest_framework.authentication import SessionAuthentication

from Appis.user.models import UserProfile

User = get_user_model()

# Create your views here.
class UserViewSet():
    pass