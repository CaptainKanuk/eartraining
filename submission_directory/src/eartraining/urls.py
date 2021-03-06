from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from pages.views import *
admin.autodiscover()

from dajaxice.core import dajaxice_autodiscover, dajaxice_config
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
dajaxice_autodiscover()

handler404 = 'pages.views.notfound'

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    #===============PAGES URLS===================
    #url(r'^pages/', include('pages.urls')),
    #===============PAGES DIRECT LINKs============
    url(r'^home/', index, name='index'),
    url(r'^index/', index, name = 'index'),
    url(r'^signin/', signin, name = 'signin'),
    url(r'^hub/', hub, name = 'hub'),
    url(r'^intervals/', intervals, name = 'intervals'),
    url(r'^melodies/', melodies, name = 'melodies'),
    url(r'^about/', about, name = 'about'),
    url(r'^help/', help, name = 'help'),
    url(r'^game_winInt/', game_winInt, name='game_winInt'),
    url(r'^game_winMel/', game_winMel, name='game_winMel'),
    url(r'^game_lossInt/', game_lossInt, name='game_lossInt'),
    url(r'^game_lossMel/', game_lossMel, name='game_lossMel'),
    url(r'^$', index, name='index'),
    #===============USER AUTHENTICATION=============
    url(r'^auth_user/$', auth_user, name='auth_user'),
    url(r'^logout/$', logoutview, name='logoutview'),
    url(r'^loggedin/$', loggedin, name='loggedin'),
    url(r'^invalid/$', invalid_login, name='invalid_login'),
    #===============USER REGISTRATION===============
    url(r'^register/$', register_user, name='register_user'),
    url(r'^register_success/$', register_success, name='register_success'),
    #===============DAJAX===============
    url(dajaxice_config.dajaxice_url, include('dajaxice.urls')),
)

urlpatterns += patterns('',
                       (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
                       )

urlpatterns += staticfiles_urlpatterns()
