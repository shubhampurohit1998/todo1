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
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'todos')

class TodoSerializer(serializers.ModelSerializer):

    class Meta: 
        model = models.Todo
        fields = '__all__'



