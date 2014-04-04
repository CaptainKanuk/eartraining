from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from pages.views import *
admin.autodiscover()

handler404 = 'pages.views.notfound'

urlpatterns = patterns('',
                       #url('handler404', notfound, name='notfound'),
                       #url('handler500', notfound, name='notfound'),
    #url(r'^$', 'eartraining.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    #===============PAGES URLS===================
    url(r'^pages/', include('pages.urls')),
    #===============PAGES DIRECT LINK============
    url(r'^about/', about, name = 'about'),
    url(r'^vextest/', vextest, name='vextest'),
    url(r'^home/', index, name='index'),
    url(r'^$', index, name='index'),
    #url(r'^$', 'eartraining.views.home', name='home'),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
