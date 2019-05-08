from django.contrib import admin
from django.utils.safestring import mark_safe
from django.db import models as djmodel

from Appis.posts import models
from WXBK.settings import ADMIN_CONF

admin.site.site_title = ADMIN_CONF['admin_title']
admin.site.site_header = ADMIN_CONF['admin_header']

# Register your models here.

@admin.register(models.Blog)
class BlogAdmin(admin.ModelAdmin):

    image = djmodel.ImageField()
    def image(self, obj):
        return mark_safe('<img src="%s" width="240px" style="border-radius: 5px;"/>' % (obj.img.url,))
    image.allow_tags = True
    image.short_description = '宣传图'


    def the_content(self, obj):
        return mark_safe(obj.content)
    the_content.allow_tags = True
    the_content.short_description = '内容'
    
    list_display = ['image', 'title', 'img', 'status', 'add_time']
    exclude = ['flag']
    readonly_fields = ['image']
    fieldsets = (
        ("内容", {
            "fields": (
                'image', 'title', 'img', 'content'
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
    list_per_page = 10
    empty_value_display = ADMIN_CONF['empty_value_display']