# Generated by Django 4.2.9 on 2024-01-11 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_document_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='createdAt',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='document',
            name='modifiedAt',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='document',
            name='file',
            field=models.FileField(max_length=10485760, upload_to=''),
        ),
    ]
