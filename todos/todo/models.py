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
