# core/models.py

from django.db import models

import uuid



class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(blank=False, null=False, max_length=10485760)
    src = models.URLField(default='')
    createdAt = models.DateTimeField(auto_now=True)
    modifiedAt = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.file.name