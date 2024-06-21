# core/views.py
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404, redirect
from django.views import View
from django.views.generic import ListView
from django.http import FileResponse
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from urllib.parse import urlparse
from .models import Document

class DocumentList(ListView):
    model = Document

    def get_queryset(self):
        queryset = Document.objects.all()
        user = self.request.user
        print(queryset)
        return queryset


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"


class DocumentCreate(APIView):
    # parser_classes = (FileUploadParser,)
    permission_classes = [AllowAny]

    def post(self, request, filename="abc", format=None):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            Document.objects.filter(pk=file_serializer.data['id']).update(
                src=file_serializer.data['file'])
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DocumentDownload(View):
    def get(self, request, relative_path):
        document = get_object_or_404(Document, id=relative_path)

        bucket_name = default_storage.bucket_name
        url = document.src

        if bucket_name == 'drop-vault' and url.__contains__('https'):
            parsed_url = urlparse(document.src)
            path = parsed_url.path

            return redirect(settings.CDN_BASE_URL + path)
        absolute_path = '{}/{}'.format(settings.MEDIA_ROOT, document)
        response = FileResponse(open(absolute_path, 'rb'), as_attachment=False)
        return response
