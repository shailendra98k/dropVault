import json

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.utils.deprecation import MiddlewareMixin


class StackOverflowMiddleware(MiddlewareMixin):
    def process_request(self, request):
        pass

        # if(request.path=='/document-add/'):
        #     reqData= json.loads(request.body)
        #     print(type(reqData['file']['data']))
        #     file = InMemoryUploadedFile(file=reqData['file']['data'], name="abc",content_type='image/png',size=20, field_name=None, charset=None)
        #     print('Request from middleare in /document-add/', file)


