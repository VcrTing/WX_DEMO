import os
import time

from django.db import models
from django.utils import timezone
from django.shortcuts import reverse

from Extra.utils import union
from WXBK.settings import BASE_DIR

# Create your models here.

def upload(data, file_name):
    union_name = union.img_name()
    file_name = union_name + file_name[-6:]
    res = data.flag # os.path.join(BASE_DIR, 'media', data.flag)
    return os.path.join(res, file_name)

class HomeSlider(models.Model):
    """
        首页轮播图
    """
    img = models.ImageField(verbose_name='图片', upload_to=upload)
    flag = models.CharField(max_length=30, default='slider', verbose_name='图片功能标识')

    status = models.BooleanField(verbose_name='数据状态', default=True)
    add_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)

    class Meta:
        verbose_name = "首页轮播图"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.flag