# core/models.py

from django.db import models

import uuid



class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(blank=False, null=False, max_length=1048576000)

    def __str__(self):
        return self.file.name