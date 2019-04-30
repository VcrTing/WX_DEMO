import uuid

from django.db import models
from django.utils import timezone

# Create your models here.

class Member(models.Model):
    """
        用户
    """

    id = models.UUIDField(primary_key = True, default = uuid.uuid1(), editable = False, null = False)
    username = models.CharField(max_length = 240, null=True, blank=True, verbose_name='账户标识')
    password = models.CharField(max_length = 240, null=True, blank=True, verbose_name='加密后的密码')

    nickName = models.CharField(max_length=30, null=True, blank=True, verbose_name='微信昵称')
    country = models.CharField(max_length=30, null=True, blank=True, verbose_name='国家')
    province = models.CharField(max_length=30, null=True, blank=True, verbose_name='省份')
    city = models.CharField(max_length=30, null=True, blank=True, verbose_name='城市')
    avatarUrl = models.CharField(max_length=240, verbose_name='微信头像', default='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556192638273&di=9e48e09e7e73eb477a5cd35be672d912&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F701c1c85751c6cf39cc2e6fdaa4b1f5b6763f9504a7df-QHJpd1_fw658')
    unionId = models.CharField(max_length=90, null=True, blank=True, verbose_name='唯一 ID')
    gender = models.CharField(max_length=6, choices=(('male', u'男'), ('female', u'女')), default='male', verbose_name='性别')

    status = models.BooleanField(verbose_name='是否可用', default=True)
    add_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)

    class Meta:
        verbose_name = "微信用户"
        verbose_name_plural = verbose_name

    def __str__(self):
        if self.nickName:
            return self.nickName
        else:
            return '-空白-'

class MemberMsg(models.Model):
    """
        用户信息
    """
    name = models.CharField(max_length=50, null=True, blank=True, verbose_name='所属姓名')
    bith = models.DateField(null=True, blank=True, verbose_name='出生年月')
    phone = models.CharField(max_length=11, null=True, blank=True, verbose_name='联系电话')
    email = models.CharField(max_length=100, null=True, blank=True, verbose_name='邮箱')
    gender = models.CharField(max_length=6, choices=(('male', u'男'), ('female', u'女')), default='male')
    member = models.ForeignKey(Member, on_delete=models.CASCADE, null=True, blank=True, verbose_name='用户')

    status = models.BooleanField(verbose_name='数据状态', default=True)
    add_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)

    class Meta:
        verbose_name = "微信用户资料"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

