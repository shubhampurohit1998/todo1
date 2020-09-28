from django.urls import include, path
from . import views
urlpatterns = [
    path('users', views.UserListCreateView.as_view(), name="user-list"),
    path('users/<int:pk>', views.UserDetailView.as_view(), ),
    path('todos', views.TodoListCreateView.as_view()),
]
