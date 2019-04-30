from django.db import models
from django.utils import timezone

from django.contrib.auth.models import AbstractUser


# Create your models here.
class UserProfile(AbstractUser):
    """
        员工
    """
    nickName = models.CharField(max_length=20, null=True, blank=True, verbose_name='昵称')
    bith = models.DateField(null=True, blank=True, verbose_name='出生年月')
    phone = models.CharField(max_length=11, null=True, blank=True, verbose_name='电话')
    email = models.CharField(max_length=100, null=True, blank=True, verbose_name='邮箱')
    gender = models.CharField(max_length=6, choices=(('male', u'男'), ('female', u'女')), default='male', verbose_name='性别')

    status = models.BooleanField(verbose_name='账号是否可用', default=True)
    add_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)

    class Meta:
        verbose_name = "员工"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.email