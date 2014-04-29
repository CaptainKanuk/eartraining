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
    url(r'^hub/', hub, name = 'hub'),
    url(r'^intervals/', intervals, name = 'intervals'),
    url(r'^melodies/', melodies, name = 'melodies'),
    url(r'^about/', about, name = 'about'),
    url(r'^help/', help, name = 'help'),
    url(r'^game_win/', game_win, name='game_win'),
    url(r'^game_loss/', game_loss, name='game_loss'),
    url(r'^$', index, name='index'),
    #===============USER AUTHENTICATION=============
    url(r'^auth_user/$', auth_user, name='auth_user'),
    url(r'^logout/$', logout, name='logout'),
    url(r'^loggedin/$', loggedin, name='loggedin'),
    url(r'^invalid/$', invalid_login, name='invalid_login'),
    #===============USER REGISTRATION===============
    url(r'^register/$', register_user, name='register_user'),
    url(r'^register_success/$', register_success, name='register_success'),
    #url(r'^get_IntervalLvl/$', get_IntervalLvl, name='get_IntervalLvl'),
)

urlpatterns += patterns('',
                       (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
                       )
