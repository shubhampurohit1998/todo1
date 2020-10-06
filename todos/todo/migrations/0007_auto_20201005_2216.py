# Generated by Django 3.1.1 on 2020-10-05 16:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0006_auto_20201005_2211'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='seen_by',
        ),
        migrations.AddField(
            model_name='notification',
            name='seen_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='seen_by', to=settings.AUTH_USER_MODEL, verbose_name='Seen by'),
        ),
    ]
