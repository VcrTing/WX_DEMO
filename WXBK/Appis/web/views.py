import requests

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import View
from django.http import JsonResponse
from django_filters.rest_framework.backends import DjangoFilterBackend

from rest_framework import mixins, viewsets, views, status
from rest_framework.response import Response
from rest_framework.decorators import list_route

from Appis.web import models
from Appis.web import serializers

from WXBK.settings import WX_CONF
# Create your views here.

class HomeSliderViewSet(viewsets.ModelViewSet):
    """
        首页轮播图
    """
    queryset = models.HomeSlider.objects.all()
    serializer_class = serializers.HomeSliderSerializer
    filter_backends = (DjangoFilterBackend, )
    filter_fields = ('status', )
    ordering_fields = ('id', )


class PageIMGViewSet(viewsets.ModelViewSet):
    """
        页面图片
    """
    queryset = models.PageIMG.objects.all()
    serializer_class = serializers.PageIMGSerializer
    filter_backends = (DjangoFilterBackend, )
    filter_fields = ('live', )

# Related User
# https://www.cnblogs.com/jinxiaohang/p/7193505.html
class OpenIdView(View):
    def get(self, request):
        code = request.GET.get('code', '')
        app_id = request.GET.get('appId', WX_CONF['APP_ID']) 
        app_secret = request.GET.get('appSecret', WX_CONF['APP_SECRET']) 
        url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+ app_id +'&secret='+ app_secret +'&js_code='+ code +'&grant_type=authorization_code'
        res = requests.get(url)
        res = eval(res.text)
        session_key = res['session_key']
        open_id = res['openid']
        
        # url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ open_id +'&secret=' + app_secret

        return JsonResponse({
            'status': True,
            'res': {
                'session_key': session_key,
                'openid': open_id
            }
        })

    def post(self, request):
        access_token = request.POST.get('access_token', None)
        openid = request.POST.get('openid', None)
        langlang = request.POST.get('langlang', None)

        if access_token:
            url = 'https://api.weixin.qq.com/sns/userinfo?access_token='+ access_token +'&openid='+ openid +'&lang=' + langlang

        return True
