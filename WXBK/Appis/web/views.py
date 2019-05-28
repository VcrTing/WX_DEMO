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
    def _req_get(self, url):
        res = requests.get(url)
        return eval(res.text)

    def _open_id(self, app_id, app_secret, code):
        url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+ app_id \
            +'&secret='+ app_secret \
            +'&js_code='+ code \
            +'&grant_type=authorization_code'
        res = self._req_get(url)
        return res['openid'], res['session_key']

    def _access_token(self, app_id, app_secret):
        url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ app_id +'&secret='+ app_secret
        res = self._req_get(url)
        return res['access_token']
    
    def _user_info(self, access_token, open_id, lang):
        url = 'https://api.weixin.qq.com/sns/userinfo?access_token='+ access_token \
            +'&openid='+ open_id \
            +'&lang=' + lang
        return requests.get(url).text

    def get(self, request):
        code = request.GET.get('code', '')
        app_id = request.GET.get('appId', WX_CONF['APP_ID']) 
        app_secret = request.GET.get('appSecret', WX_CONF['APP_SECRET']) 
        lang = request.GET.get('lang', 'zh_CN')
        
        open_id, session_key = self._open_id(app_id, app_secret, code)
        access_token = self._access_token(app_id, app_secret)
        # user_info = self._user_info(access_token, open_id, lang)
        # print('user_info =', user_info)

        return JsonResponse({
            'status': True,
            'res': {
                'access_token': access_token,
                'session_key': session_key,
                'openid': open_id,
                'user_info': "str(user_info)"
            }
        })

    def post(self, request):
        
        
        return ''
