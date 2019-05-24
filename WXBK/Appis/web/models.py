import os
import time

from django.db import models
from django.utils import timezone
from django.shortcuts import reverse

from Extra.utils import union
from WXBK.settings import BASE_DIR, MEDIA_ROOT

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

    status = models.BooleanField(verbose_name='是否可用', default=True)
    add_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)

    class Meta:
        verbose_name = "首页轮播图"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.flag

def upload_union(data, file_name):
    (file_name,res) = os.path.splitext(file_name)
    res = os.path.join(data.flag, data.live + '.jpg')
    try:
        res_older = os.path.join(MEDIA_ROOT, res)
        if os.path.exists(res_older):
            os.remove(res_older)
    except:
        pass
    return res

class PageIMG(models.Model):
    """
        页面图片链接
    """
    flag = models.CharField(max_length=30, default='pageIMG', verbose_name='图片功能标识')
    live = models.CharField(max_length=30, verbose_name="唯一联络标识")
    img = models.ImageField(upload_to=upload_union, verbose_name="图片")
    mark = models.CharField(max_length=120, verbose_name="备注", null=True, blank=True)

    add_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)

    class Meta:
        verbose_name = "页面图片链接"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.flag