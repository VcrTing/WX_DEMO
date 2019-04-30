from django.contrib import admin
from django.db import models as djmodel

from . import models
from .models import ORDER_STATUS
from WXBK.settings import ADMIN_CONF

admin.site.site_title = ADMIN_CONF['admin_title']
admin.site.site_header = ADMIN_CONF['admin_header']

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
    list_filter = ['order_status']

    list_per_page = 30
    empty_value_display = '- 空白 -'

class OrderBelongAdmin(admin.ModelAdmin):

    def name(self, obj):
        return obj.member_msg.name
    name.short_description = '用户姓名'
    def email(self, obj):
        return obj.member_msg.email
    email.short_description = '邮箱'
    def phone(self, obj):
        return obj.member_msg.phone
    phone.short_description = '电话'

    def order_number(self, obj):
        return obj.order.order_number
    order_number.short_description = '订单号'
    def order_title(self, obj):
        return obj.order.order_title
    order_title.short_description = '订单标题'
    def order_status(self, obj):
        s = obj.order.order_status
        if (s == 0):
            return '不可用'
        elif (s == 1):
            return '待回应'
        elif (s == 2):
            return '预约中'
        elif (s == 3):
            return '已完成'
    order_status.short_description = '订单状态'
    def order_content(self, obj):
        return obj.order.order_content
    order_content.short_description = '订单内容'

    list_display = ['name', 'order_number', 'order_title', 'order_content', 'email', 'phone', 'order_status', 'status', 'add_time']
    fieldsets = (
        ("订单详情", {
            "fields": (
                'order_number', 'order_title', 'order_content', 'order_status'
            ),
        }),
        ("所属用户的资料", {
            "fields": (
                'name', 'email', 'phone'
            ),
        }),
        ("其他", {
            "fields": (
                'status', 'add_time'
            ),
        }),
    )
    search_fields = ['order_number', 'email', 'phone', 'name']
    readonly_fields = list_display

    list_per_page = 30
    empty_value_display = '- 空白 -'

admin.site.register(models.Order, OrderAdmin)
admin.site.register(models.OrderBelong, OrderBelongAdmin)