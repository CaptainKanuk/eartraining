from django.conf.urls import patterns, url
from django.conf.urls.static import static
from django.conf import settings
from pages import views

urlpatterns = patterns('',
                       #url('handler404', notfound, name='notfound'),
                       #url('handler500', notfound, name='notfound'),
    url(r'^$', views.index, name='index'),
    url(r'^about/$', views.about, name='about'),
    url(r'^vextest/$', views.vextest, name='vextest'),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)