# Generated by Django 2.2 on 2019-04-30 07:21

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.UUIDField(default=uuid.UUID('9ff5b032-6b18-11e9-bcda-784f4385dde6'), editable=False, primary_key=True, serialize=False)),
                ('username', models.CharField(blank=True, max_length=240, null=True, verbose_name='账户标识')),
                ('password', models.CharField(blank=True, max_length=240, null=True, verbose_name='加密后的密码')),
                ('nickName', models.CharField(blank=True, max_length=30, null=True, verbose_name='微信昵称')),
                ('country', models.CharField(blank=True, max_length=30, null=True, verbose_name='国家')),
                ('province', models.CharField(blank=True, max_length=30, null=True, verbose_name='省份')),
                ('city', models.CharField(blank=True, max_length=30, null=True, verbose_name='城市')),
                ('avatarUrl', models.CharField(default='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556192638273&di=9e48e09e7e73eb477a5cd35be672d912&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F701c1c85751c6cf39cc2e6fdaa4b1f5b6763f9504a7df-QHJpd1_fw658', max_length=240, verbose_name='微信头像')),
                ('unionId', models.CharField(blank=True, max_length=90, null=True, verbose_name='唯一 ID')),
                ('gender', models.CharField(choices=[('male', '男'), ('female', '女')], default='male', max_length=6, verbose_name='性别')),
                ('status', models.BooleanField(default=True, verbose_name='是否可用')),
                ('add_time', models.DateTimeField(default=django.utils.timezone.now, verbose_name='创建时间')),
            ],
            options={
                'verbose_name': '微信用户',
                'verbose_name_plural': '微信用户',
            },
        ),
        migrations.CreateModel(
            name='MemberMsg',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True, verbose_name='所属姓名')),
                ('bith', models.DateField(blank=True, null=True, verbose_name='出生年月')),
                ('phone', models.CharField(blank=True, max_length=11, null=True, verbose_name='联系电话')),
                ('email', models.CharField(blank=True, max_length=100, null=True, verbose_name='邮箱')),
                ('gender', models.CharField(choices=[('male', '男'), ('female', '女')], default='male', max_length=6)),
                ('status', models.BooleanField(default=True, verbose_name='数据状态')),
                ('add_time', models.DateTimeField(default=django.utils.timezone.now, verbose_name='创建时间')),
                ('member', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='member.Member', verbose_name='用户')),
            ],
            options={
                'verbose_name': '微信用户资料',
                'verbose_name_plural': '微信用户资料',
            },
        ),
    ]
