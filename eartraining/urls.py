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
    url(r'^signin/', signin, name = 'signin'),
    url(r'^train/', train, name = 'train'),
    url(r'^intervals/', intervals, name = 'intervals'),
    url(r'^about/', about, name = 'about'),
    url(r'^help/', help, name = 'help'),
    url(r'^$', index, name='index'),
    #===============TESTING URLS====================
    url(r'^vextest/', vextest, name='vextest'),
    #===============DATABASE STUFF==================
    url(r'^add_user/', add_user, name='add_user'),
    #===============USER AUTHENTICATION=============
                       #url(r'^accounts/auth/', auth_view, name='auth_view'),
                       #url(r'^accounts/logout/', logout, name='logout'),
                       #url(r'^accounts/loggedin/', loggedin, name='loggedin'),
                       #url(r'^accounts/invalid/', invalid, name='invalid'),
)

urlpatterns += patterns('',
                       (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
                       )
