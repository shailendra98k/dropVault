# core/views.py
import http.client
import mimetypes
import os

from django import views
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.views.generic import ListView
from django.views.generic.edit import CreateView
from django.http import FileResponse, HttpResponseForbidden, HttpResponse
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from django.urls import reverse
from django.conf import settings
from rest_framework.parsers import FileUploadParser, MultiPartParser
from .models import Document
from rest_framework.response import Response

class DocumentList( ListView):
    model = Document

    def get_queryset(self):
        queryset = Document.objects.all()
        user = self.request.user
        print(queryset)



        # if not user.is_superuser:
        #     queryset = queryset.filter(
        #         created_by=user
        #     )

        return queryset

from rest_framework import serializers, status
from .models import Document

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"



class DocumentCreate(APIView):
    # parser_classes = (FileUploadParser,)
    permission_classes = [AllowAny]

    def post(self, request, filename="abc", format=None):
        # file_obj = request.data['file']
        print("Req data is: ", request.data)
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class DocumentCreate(CreateView):
#     # model = Document
#     # fields = ['title', 'description', 'file']
#
#     def get_success_url(self):
#         print("request is: ", self.request)
#         return reverse('home')
#
#     def form_valid(self, form):
#         print("request is: ", self.request)
#         form.instance.created_by = self.request.user
#         return super().form_valid(form)
#
#     def post(self, request, *args, **kwargs):
#
#
#         file1 = ContentFile(self.request.body)
#         print("Request is: ", file1.file)
#
#         doc = Document(file=file1.file, description="From dropbox", title="temp", created_by=User.objects.get_by_natural_key(self.request.user))
#         doc.save()
#         return HttpResponse(content={'1':'2'})
#         pass




class DocumentDownload(View):
    def get(self, request, relative_path):
        document = get_object_or_404(Document, id=relative_path)
        content_type =mimetypes.guess_type(document.file.name)[0]
        absolute_path = '{}/{}'.format(settings.MEDIA_ROOT, document)
        response = FileResponse(open(absolute_path, 'rb'), as_attachment=False)
        return response
