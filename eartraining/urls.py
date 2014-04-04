from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    #url(r'^$', 'eartraining.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    #===============HOMEPAGE URLS===================
    url(r'^homepage/', include('homepage.urls')),
    url(r'^$', include('homepage.urls')),
    #url(r'^$', 'eartraining.views.home', name='home'),
)
