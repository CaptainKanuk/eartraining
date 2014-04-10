from django.conf.urls import patterns, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from pages import views
admin.autodiscover()

urlpatterns = patterns('',
                       #url('handler404', notfound, name='notfound'),
                       #url('handler500', notfound, name='notfound'),
    url(r'^$', views.index, name='index'),
    url(r'^about/$', views.about, name='about'),
    url(r'^vextest/$', views.vextest, name='vextest'),
)

urlpatterns += patterns('',
                        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
                        )