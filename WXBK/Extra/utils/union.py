import random
import time

"""
    专门生产不一的标识字符串
"""

# 订单
def order_number():
    res = time.strftime('%Y_%m%H%M%S',time.localtime(time.time()))
    res = 'WX_' + res + '_' + str(random.randint(100, 999))
    return res

# 图片
def img_name():
    res = time.strftime('%Y_%m_%d',time.localtime(time.time()))
    res = res + '_' + str(random.randint(100, 999))
    return res