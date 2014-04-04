from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    #url(r'^$', 'eartraining.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    #===============HOMEPAGE URLS===================
    url(r'^homepage/', include('pages.urls')),
    url(r'^$', include('pages.urls')),
    #url(r'^$', 'eartraining.views.home', name='home'),
)
