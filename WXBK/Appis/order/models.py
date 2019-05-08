from django.db import models
from django.utils import timezone
from django.shortcuts import reverse
from django.contrib.auth import get_user_model

from Appis.member import models as MemberModels

from Extra.utils import union

# Create your models here.
ORDER_STATUS = (
    (0, '已过期'),
    (1, '待回应'),
    (2, '预约中'),
    (3, '已完成'),
)
class Order (models.Model):
    """
        订单
    """
    order_number = models.CharField(max_length=50, default=union.order_number, null=True, blank=True, verbose_name='编号')
    order_title = models.CharField(max_length=50, default='', blank=True, verbose_name='标题')
    order_content = models.CharField(max_length=240, null=True, blank=True, verbose_name='内容')
    order_date = models.CharField(max_length=10, null=True, blank=True, verbose_name='预约日期')
    order_time = models.CharField(max_length=8, null=True, blank=True, verbose_name='预约时间')
    order_status = models.IntegerField(choices=ORDER_STATUS, default=1, verbose_name='订单状态')
    member = models.ForeignKey(MemberModels.Member, on_delete=models.CASCADE, null=True, blank=True, verbose_name='用户')

    status = models.BooleanField(verbose_name='是否可用', default=True)
    add_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)

    class Meta:
        verbose_name = "订单"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.order_title

class OrderBelong (models.Model):
    """
        订单
    """
    member_msg = models.ForeignKey(MemberModels.MemberMsg, on_delete=models.CASCADE, null=True, blank=True, verbose_name='订单所属用户')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True, verbose_name='订单')

    status = models.BooleanField(verbose_name='是否可用', default=True)
    add_time = models.DateTimeField(verbose_name='创建时间', default=timezone.now)

    class Meta:
        verbose_name = "订单所属记录"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.order.order_title
