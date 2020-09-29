from rest_framework import serializers
from . import models


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
        fields = ('username', 'email', 'password',
                  'first_name', 'last_name', 'todos')


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Todo
        fields = '__all__'

    def create(self, validated_data):
        return models.Todo.objects.create(**validated_data)


class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField()
    password2 = serializers.CharField()

    class Meta:
        model = models.User
        fields = ('email', 'password1', 'password2', 'is_user', 'is_agent')

    def save(self, request):
        # import pdb
        # pdb.set_trace()
        # print(request.data)
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid()
        serializer.save(request=request)
