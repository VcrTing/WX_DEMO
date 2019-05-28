from django.contrib import admin
from django.db import models as djmodel

from . import models
from .models import ORDER_STATUS
from WXBK.settings import ADMIN_CONF

admin.site.site_title = ADMIN_CONF['admin_title']
admin.site.site_header = ADMIN_CONF['admin_header']

ORDER_STATUS = [ '已过期', '待回应', '预约中', '已完成']
# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    usefull = ['order_number', 'order_title', 'order_content', 'order_date', 'order_time', 'status']
    readonly_fields = usefull + ['order_number', 'add_time', 'member']
    list_display = usefull + ['order_status']
    list_editable = ['order_status']
    exclude = ['id']
    fieldsets = (
        ("订单详情", {
            "fields": (
                'order_number', 'order_title', 'order_content', 'order_date', 'order_time', 'order_status'
            ),
        }),
        ("所属微信用户", {
            "fields": (
                'member',
            ),
        }),
        ("其他", {
            "fields": (
                'status', 'add_time'
            ),
        }),
    )
    
    search_fields = ['order_number', 'order_date', 'order_time']
    list_filter = ['order_status', 'order_title']
    date_hierarchy = 'add_time'

    list_per_page = 30
    empty_value_display = ADMIN_CONF['empty_value_display']

    def get_ordering(self, request):
        return ['-add_time', ]

class OrderBelongAdmin(admin.ModelAdmin):

    def name(self, obj):
        return obj.member_msg.name
    name.short_description = '姓名'
    def email(self, obj):
        return obj.member_msg.email
    email.short_description = '邮箱'
    """
    def phone(self, obj):
        return obj.member_msg.phone
    phone.short_description = '电话'
    """
    def order_number(self, obj):
        return obj.order.order_number
    order_number.short_description = '订单号'
    def order_title(self, obj):
        return obj.order.order_title
    order_title.short_description = '产品项目'
    def order_status(self, obj):
        s = obj.order.order_status
        if (s == 0):
            return ORDER_STATUS[0]
        elif (s == 1):
            return ORDER_STATUS[1]
        elif (s == 2):
            return ORDER_STATUS[2]
        elif (s == 3):
            return ORDER_STATUS[3]
    order_status.short_description = '订单状态'
    def order_content(self, obj):
        return obj.order.order_content
    order_content.short_description = '备注'
    def nickName(self, obj):
        return obj.order.member.nickName
    nickName.short_description = '微信昵称'

    list_display = ['order_number', 'nickName', 'name', 'order_title', 'order_content', 'email', 'order_status', 'status', 'add_time']
    list_display_links = ('order_number', )
    fieldsets = (
        ("订单详情", {
            "fields": (
                'order_number', 'order_title', 'order_content', 'order_status'
            ),
        }),
        ("所属用户的资料", {
            "fields": (
                'name', 'email'
            ),
        }),
        ("订单提交者微信资料", {
            "fields": (
                'nickName',
            ),
        }),
        ("其他", {
            "fields": (
                'status', 'add_time'
            ),
        }),
    )
    readonly_fields = list_display

    list_per_page = 30
    empty_value_display = ADMIN_CONF['empty_value_display']

admin.site.register(models.Order, OrderAdmin)
admin.site.register(models.OrderBelong, OrderBelongAdmin)