
from django.db.models import Q
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

from Appis.user.models import UserProfile

User = get_user_model()

class CustomBackend(ModelBackend):
    """
        自定义用户验证
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserProfile.objects.get(Q(username = username)|Q(email=username))
            if user.check_password(password):
                return user
        except:
            return None