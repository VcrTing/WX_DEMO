import os
import time

from django.db import models
from django.utils import timezone
from django.shortcuts import reverse

from ckeditor.fields import RichTextField, CKEditorWidget
from ckeditor_uploader.fields import RichTextUploadingField
from Extra.utils import union
from WXBK.settings import BASE_DIR

# Create your models here.

def upload(data, file_name):
    union_name = union.img_name()
    file_name = union_name + file_name[-6:]
    res = data.flag # os.path.join(BASE_DIR, 'media', data.flag)
    return os.path.join(res, file_name)

class Blog(models.Model):
    """
        活动讯息
    """
    img = models.ImageField(verbose_name='宣传图片', upload_to=upload)
    flag = models.CharField(max_length=30, default='blog', verbose_name='图片功能标识')
    title = models.CharField(max_length=120, default='', verbose_name='宣传标题')

    content = RichTextField(default='', verbose_name='内容讯息')
    """
    UEditorField(width=600, height=300, toolbars="full",
        imagePath="images/", filePath="files/", upload_settings={"imageMaxSize": 1204000*2}, 
        settings={}, verbose_name='内容讯息')
    """
    status = models.BooleanField(verbose_name='数据状态', default=True)
    add_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)

    class Meta:
        verbose_name = "活动讯息"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title