from django.urls import path
from .views import *

app_name = 'web'
urlpatterns = [
    path('wx/openId', OpenIdView.as_view()),
]