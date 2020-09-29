from rest_framework import serializers
from . import models
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.registration.views import RegisterView
from rest_framework.response import Response

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.contrib.auth.models import Group


class UserSerializer(serializers.ModelSerializer):
    todos = serializers.SerializerMethodField()
    # This code saved my life

    def get_todos(self, obj):
        todos = models.Todo.objects.filter(user=obj.id)
        if not todos:
            return None
        return TodoSerializer(todos, many=True).data

    class Meta:
        model = models.User
        fields = ('id', 'email', 'first_name', 'last_name',
                  'is_user', 'is_agent', 'todos')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'email', 'first_name', 'last_name',
                  'is_user', 'is_agent')


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Todo
        fields = '__all__'


class CustomRegisterSerializer(RegisterSerializer):
    is_user = serializers.BooleanField(default=False)
    is_agent = serializers.BooleanField(default=False)

    def custom_signup(self, request, user):
        try:
            # user_group = Group.objects.get(name="user")
            # agent_group = Group.objects.get(name="agent")
            user.is_user = self.validated_data.get('is_user', '')
            user.is_agent = self.validated_data.get('is_agent', '')
            user.save(update_fields=['is_user', 'is_agent'])
            # print(user.id)
            # if user.is_user:
            #     user_group.user_set.add(user)
            # else:
            #     agent_group.user_set.add(user)
        except:
            return Response({'error': "User does not create"})


class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer
