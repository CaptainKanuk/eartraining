from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from pages.views import *
admin.autodiscover()

handler404 = 'pages.views.notfound'

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    #===============PAGES URLS===================
    #url(r'^pages/', include('pages.urls')),
    #===============PAGES DIRECT LINKs============
    url(r'^home/', index, name='index'),
    url(r'^index/', index, name = 'index'),
    url(r'^register/', register, name = 'register'),
    url(r'^intervals/', intervals, name = 'intervals'),
    url(r'^about/', about, name = 'about'),                       
    url(r'^contact/', contact, name = 'contact'),
    url(r'^help/', help, name = 'help'),
    url(r'^$', index, name='index'),
    #===============TESTING URLS====================
    url(r'^vextest/', vextest, name='vextest'),
                       )

urlpatterns += patterns('',
                       (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
                       )