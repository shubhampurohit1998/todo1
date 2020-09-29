from django.contrib.auth.models import Group
import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'django_rest_permission.settings')


django.setup()


GROUPS = ['admin', 'anonymous', 'agent', 'user']
MODELS = ['user']

for group in GROUPS:
    new_group, created = Group.objects.get_or_create(name=group)
