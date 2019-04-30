import json
import uuid

from django.contrib.auth.hashers import make_password, check_password
from django_filters.rest_framework.backends import DjangoFilterBackend
from django.core import serializers as djser
from django.forms.models import model_to_dict

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import list_route

from Appis.member.models import *
from Appis.member.serializers import *

from Extra.utils.tokens import create_token, verify_token

# View
class MemberViewSet(viewsets.ModelViewSet):
    """
        微信会员
    """
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    @list_route (methods = ['post'])
    def login (self, request):
        is_new = True
        res = {
            'status': False,
            'is_new': is_new,
            'res': ''
        }
        data = json.loads(request.body)
        user = Member.objects.filter(username = data['username'])
        
        # 注册用户名校验
        if len(user):
            print('已注册')
            is_new = False
        else:
            print('未注册')
            data['id'] = uuid.uuid1()
            data['password'] = make_password(data['password'])
            user = Member.objects.create(**data)
            user = Member.objects.filter(username = data['username'])
        
        # 可登录
        user = MemberSerializer(user, many = True).data[0]
        if not is_new:
            check_pass_result = check_password(data['password'], user['password'])
            if not check_pass_result:
                res['res'] = '密码错误'
                return Response(res)
        # 最终返回
        res['status'] = True
        res['res'] = user
        return Response(res)

    @list_route(methods = ['get'])
    def all_users (self, request):
        try:
            users = UserSerializer(Users.objects.all(), many = True).data
            res = {
                'success': True,
                'data': users
            }
            response = Response(res)
            response['Access-Control-Expose-Headers'] = 'auth'
            response['auth'] = token
            return response
        except:
            res = {
                'success': False,
                'mess': '请登录'
            }
            return Response(res)

class MemberMsgViewSet(viewsets.ModelViewSet):
    """
        微信会员永久真实资料
    """
    queryset = MemberMsg.objects.all()
    serializer_class = MemberMsgSerializer
    
    @list_route(methods = ['post'])
    def create_or_update(self, request):
        res = {
            'status': False,
            'res': '服务器错误'
        }
        data = json.loads(request.body)

        try:
            member = Member.objects.get(id = data['member'])
            data['member'] = member
            member_msg, is_new = MemberMsg.objects.get_or_create(**data)
            member_msg = model_to_dict(member_msg)
        except:
            return Response(res)
        res['status'] = True
        res['res'] = member_msg
        return Response(res)