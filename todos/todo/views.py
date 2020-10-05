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
from .permissions import AgentPermissions, IsOwnerOrAgent, IsInstanceOwner, UserCanHaveTodos
from .paginators import TodoPagination, UserPagination


class UserListCreateDetialView(mixins.ListModelMixin,  mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    filter_backends = (SearchFilter, OrderingFilter)
    pagination_class = UserPagination
    search_fields = ['email', 'first_name']
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

    @action(detail=True, methods=['GET'], url_path="todos", url_name="user_todos")
    def get_user_todos(self, request, pk=None):
        try:
            user = self.get_queryset().get(id=pk)
            queryset = Todo.objects.filter(user=user).order_by('-created_at')
            serializer = serializers.TodoSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'error': "Bad request"}, status=status.HTTP_400_BAD_REQUEST)


class TodoDetailViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Todo.objects.all()
    serializer_class = serializers.TodoSerializer
    search_fields = ['title', '=user__id']
    pagination_class = TodoPagination
    permission_classes_by_action = {
        'list': [AgentPermissions],
        'retrieve': [UserCanHaveTodos | AgentPermissions],
        'partial_update': [UserCanHaveTodos],
        'destroy': [UserCanHaveTodos],
        'update': [UserCanHaveTodos]
    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)

    @action(detail=False, methods=['GET'], url_path="todos_active", url_name="acitve_todos")
    def get_todos_active(self, request, pk=None):
        try:
            queryset = self.get_queryset().filter(
                user=request.user).order_by('-created_at')
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': "Bad request"})

    @action(detail=False, methods=['GET'],  url_path="todos_complete", url_name="todos_complete")
    def get_todos_completed(self, request):
        try:
            queryset = self.get_queryset().filter(
                user=request.user, is_complete=True).order_by('-updated_at')
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': "Bad request"})

    def create(self, request, *args, **kwargs):
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

    @action(detail=False, methods=["GET"], url_name="search-todo", url_path="search-todo")
    def search_todos(self, request, *args, **kwargs):
        # import pdb
        # pdb.set_trace()
        queryset = self.get_queryset().filter(user=request.user,
                                              title__icontains=request.query_params.get('title')).order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # @action(detail=False, methods=['GET'])
