# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

# Third Party
from rest_framework import routers

# Ours
from apps.coffee import views as coffee_views
from apps.roast import views as roast_views
from apps.temppoint import views as temppoint_views

urlpatterns = patterns('',
    url(r'^$',  # noqa
        TemplateView.as_view(template_name='pages/home.html'),
        name="home"),
    url(r'^about/$',
        TemplateView.as_view(template_name='pages/about.html'),
        name="about"),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    # User management
    url(r'^users/', include("apps.users.urls", namespace="users")),
    url(r'^accounts/', include('allauth.urls')),

    # Uncomment the next line to enable avatars
    url(r'^avatar/', include('avatar.urls')),

    # Your stuff: custom urls go here

) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# DJANGO REST FRAMEWORK

router = routers.DefaultRouter()
router.register(r'roast', roast_views.RoastViewSet, base_name='api-roast')
router.register(r'temppoint', temppoint_views.TempPointViewSet, base_name='api-temppoint')
router.register(r'coffee', coffee_views.CoffeeViewSet, base_name='api-coffee')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns += patterns('',
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)

urlpatterns += staticfiles_urlpatterns()