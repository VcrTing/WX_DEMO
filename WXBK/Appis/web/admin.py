from django.contrib import admin
from django.utils.safestring import mark_safe
from django.db import models as djmodel

from Appis.web import models
from WXBK.settings import ADMIN_CONF

admin.site.site_title = ADMIN_CONF['admin_title']
admin.site.site_header = ADMIN_CONF['admin_header']

# Register your models here.

@admin.register(models.HomeSlider)
class HomeSliderAdmin(admin.ModelAdmin):
    
    image = djmodel.ImageField()
    def image(self, obj):
        return mark_safe('<img src="%s" width="240px" style="border-radius: 5px;"/>' % (obj.img.url,))
    image.allow_tags = True
    image.short_description = '缩略图'
    
    list_display = ['image', 'img', 'status', 'add_time']
    exclude = ['flag']
    readonly_fields = ['image']
    fieldsets = (
        ("内容", {
            "fields": (
                'image', 'img',
            ),
        }),
        ("其他", {
            "fields": (
                'status', 'add_time'
            ),
        }),
    )
    list_editable = ['status']
    list_filter = ['status']
    list_per_page = 50
    empty_value_display = ADMIN_CONF['empty_value_display']

    def get_ordering(self, request):
        return ['id', ]

@admin.register(models.PageIMG)
class PageIMGAdmin(admin.ModelAdmin):

    image = djmodel.ImageField()
    def image(self, obj):
        return mark_safe('<img src="%s" width="170px" style="border-radius: 5px;"/>' % (obj.img.url,))
    image.allow_tags = True
    image.short_description = '缩略图'
    
    list_display = ['image', 'img', 'live', 'mark', 'add_time']
    exclude = ['flag']
    readonly_fields = ['image']
    fieldsets = (
        ("内容", {
            "fields": (
                'image', 'img', 'live', 'mark'
            ),
        }),
        ("其他", {
            "fields": (
                'add_time',
            ),
        }),
    )
    list_per_page = 50
    empty_value_display = ADMIN_CONF['empty_value_display']
    """
    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
    """