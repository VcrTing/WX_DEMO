import logging   
import logging.handlers   
from logging.handlers import WatchedFileHandler   
import os   
import multiprocessing   

bind = "0.0.0.0:8000"   
backlog = 512
worker_class = 'sync'
workers = multiprocessing.cpu_count()   
threads = multiprocessing.cpu_count()*4   
loglevel = 'error'
access_log_format = '%(t)s %(p)s %(h)s "%(r)s" %(s)s %(L)s %(b)s %(f)s" "%(a)s"'   

accesslog = "./gunicorn_access.log"   
errorlog = "./gunicorn_error.log"

proc_name = 'WXBK'