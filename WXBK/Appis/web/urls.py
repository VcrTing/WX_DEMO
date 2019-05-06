from django.urls import path
from .views import *

from Appis.posts.views import BlogView

app_name = 'web'
urlpatterns = [
    path('wx/openId', OpenIdView.as_view()),
    path('blog/<int:id>/', BlogView.as_view())
]