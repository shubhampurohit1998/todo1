from rest_framework import permissions


class IsOwnerOrAgent(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):

        # Instance must have an attribute named `owner`.
        return obj == request.user or request.user.is_agent


class IsInstanceOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user

class UserCanHaveTodos(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class AgentPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_agent
