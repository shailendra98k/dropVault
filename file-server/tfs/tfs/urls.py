# docman/urls.py

from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views

from core.views import DocumentList, DocumentCreate, DocumentDownload

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', DocumentList.as_view(), name='home'),
    path('document-add/', DocumentCreate.as_view(), name='document-add'),
    path('media/<path:relative_path>', DocumentDownload.as_view(), name='document-download'),

    path('accounts/login/', auth_views.LoginView.as_view()),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
]