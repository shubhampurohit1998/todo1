# Generated by Django 3.1.1 on 2020-10-06 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0009_notification'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='message',
            field=models.CharField(choices=[('WATCH', 'Viewed your profile')], default=1, max_length=10),
            preserve_default=False,
        ),
    ]