from django.conf.urls import patterns, url
from django.conf.urls.static import static
from django.conf import settings
from pages import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^about/$', views.about, name='about'),) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)