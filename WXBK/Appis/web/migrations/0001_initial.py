# Generated by Django 2.2 on 2019-05-08 10:01

import Appis.web.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HomeSlider',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(upload_to=Appis.web.models.upload, verbose_name='图片')),
                ('flag', models.CharField(default='slider', max_length=30, verbose_name='图片功能标识')),
                ('status', models.BooleanField(default=True, verbose_name='是否可用')),
                ('add_time', models.DateTimeField(default=django.utils.timezone.now, verbose_name='创建时间')),
            ],
            options={
                'verbose_name': '首页轮播图',
                'verbose_name_plural': '首页轮播图',
            },
        ),
    ]
