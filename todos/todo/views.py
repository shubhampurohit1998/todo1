from django.shortcuts import render
from rest_framework import generics
from rest_framework import mixins
from rest_framework import permissions
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import User, Todo
from . import serializers
from rest_framework.filters import SearchFilter, OrderingFilter
from django.contrib.auth.models import Group
from .permissions import AgentPermissions, IsOwnerOrAgent, IsInstanceOwner


class UserListCreateDetialView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes_by_action = {
        'list': [AgentPermissions],
        'retrieve': [IsOwnerOrAgent],
        'partial_update': [IsInstanceOwner],
        'destroy': [IsInstanceOwner],
        'update': [IsInstanceOwner]
    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)

    @action(detail=False, methods=['GET'], url_path="profile", url_name="profile")
    def get_user_profile(self, request, pk=None):
        try:
            queryset = self.get_queryset().get(id=request.user.id)
            serializer = serializers.ProfileSerializer(queryset, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except(User.DoesNotExist):
            return Response({"error": 'The user does not exist'}, status=status.HTTP_204_NO_CONTENT)


class TodoListCreateView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Todo.objects.all()
    serializer_class = serializers.TodoSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('title', '=user',)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        user = None
        try:
            if request and hasattr(request, "user"):
                user = request.user
                if request.data.get('title'):
                    query = Todo.objects.create(
                        user=user, title=request.data.get('title'))
                    return Response(self.get_serializer(query, many=False).data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST,)


class TodoDetailViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Todo.objects.all()
    serializer_class = serializers.TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['GET'])
    def get_todos(self, request, pk=None):
        queryset = self.get_queryset().filter(user=request.user).order_by('-created_at')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # @action(detail=False, methods=["GET"])
    # def search_todos(self, request):
    #     queryset = self.get_queryset().filter(user=request.user,
    #                                           title__icontains=request.data.get('title')).order_by('-created_at')
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)
