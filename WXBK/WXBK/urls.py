"""WXBK URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import static
from django.views.static import serve 

from rest_framework import routers
from rest_framework.documentation import include_docs_urls

from . import settings
# import Extra.xadmin as xadmin
from Appis.member import views as MemberView
from Appis.order import views as OrderView
from Appis.posts import views as PostsView
from Appis.web import views as WebView

router = routers.DefaultRouter()
# Member
router.register('member', MemberView.MemberViewSet)
router.register('member_msg', MemberView.MemberMsgViewSet)

# Order
router.register('order', OrderView.OrderViewSet)
router.register('order_belong', OrderView.OrderBelongViewSet)

# Posts
router.register('blog', PostsView.BlogViewSet)

# Web
router.register('home_slider', WebView.HomeSliderViewSet)
router.register('page_img', WebView.PageIMGViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^media/(?P<path>.*)$',  serve, {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_DIR}),
    # path('xadmin/', xadmin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),

    path('api/', include(router.urls)),
    path('docs/', include_docs_urls(title='微信小程序')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    
    path('web/', include('Appis.web.urls')),
]

urlpatterns += static.static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)