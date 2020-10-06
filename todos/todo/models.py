from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    is_user = models.BooleanField(default=False, verbose_name="User")
    is_agent = models.BooleanField(default=False, verbose_name="Agent")

    def __str__(self):
        if self.first_name is not '':
            return "{} {}".format(self.first_name, self.last_name)
        else:
            return self.username


class Todo(models.Model):
    title = models.CharField(max_length=300, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_complete = models.BooleanField(default=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="todo")

    def __str__(self):
        return self.title


MESSAGE_CHOICES = [
    ("WATCH", 'Viewed your profile')
]


class Notification(models.Model):
    seen = models.BooleanField(default=False)
    message = models.CharField(
        choices=MESSAGE_CHOICES, null=False, blank=False, max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    seen_by = models.ForeignKey(
        User, related_name="seen_by", on_delete=models.SET_NULL, null=True, verbose_name="Seen by")
    user = models.ForeignKey(
        User, related_name="user", on_delete=models.CASCADE, verbose_name="User")

    def __str__(self):
        return self.user.username
