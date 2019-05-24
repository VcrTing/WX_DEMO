from django.contrib import admin
from django.utils.safestring import mark_safe
from django.db import models as djmodel

from Appis.member import models
from WXBK.settings import ADMIN_CONF

admin.site.site_title = ADMIN_CONF['admin_title']
admin.site.site_header = ADMIN_CONF['admin_header']

# Register your models here.

@admin.register(models.Member)
class MemberAdmin(admin.ModelAdmin):

    avatar = djmodel.ImageField()
    def avatar(self, obj):
        return mark_safe('<img src="%s" width="28" height="28" style="border-radius:100px"/>' % (obj.avatarUrl,))
    avatar.allow_tags = True
    avatar.short_description = '微信头像'

    list_display = ['avatar', 'nickName', 'gender', 'country', 'province', 'city', 'status', 'add_time']
    exclude = ['id', 'username', 'password', 'avatarUrl']
    fieldsets = (
        ("基本信息", {
            "fields": (
                'avatar', 'nickName', 'gender'
            ),
        }),
        ("地址", {
            "fields": (
                'country', 'province', 'city'
            ),
        }),
        ("其他", {
            "fields": (
                'status', 'add_time'
            ),
        }),
    )
    
    readonly_fields = list_display
    # list_editable = ['country', 'gender']
    search_fields = ['nickName', 'country', 'province', 'city']
    list_filter = ['gender', 'country', 'status']

    list_per_page = 50
    empty_value_display = '(Secrecy)'

    def get_ordering(self, request):
        return ['-add_time', ]

@admin.register(models.MemberMsg)
class MemberMsgAdmin(admin.ModelAdmin):
    list_display = ['name', 'bith', 'phone', 'email', 'gender', 'status', 'add_time']
    exclude = ['id']
    readonly_fields = ['add_time']
    fieldsets = (
        ("基本信息", {
            "fields": (
                'name', 'bith', 'gender'
            ),
        }),
        ("联系方式", {
            "fields": (
                'phone', 'email'
            ),
        }),
        ("其他", {
            "fields": (
                'status', 'add_time'
            ),
        }),
    )
    search_fields = ['name', 'email', 'phone']
    list_filter = ['status']

    list_per_page = 50
    empty_value_display = ADMIN_CONF['empty_value_display']

    def get_ordering(self, request):
        return ['-add_time', ]