from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
admin.autodiscover()

handler404 = 'eartraining.pages.views.notfound'

urlpatterns = patterns('',
    url('handler404', 'pages.views.notfound'),
    url('handler500', 'pages.views.notfound'),
    #url(r'^$', 'eartraining.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    #===============PAGES URLS===================
    url(r'^pages/', include('pages.urls')),
    url(r'^about/', include('pages.urls')),
    url(r'^$', include('pages.urls')),
    #url(r'^$', 'eartraining.views.home', name='home'),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
