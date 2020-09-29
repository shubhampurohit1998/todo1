
from django.contrib import admin
from django.urls import path, include
from todo import urls
from todo.views import TodoDetailViewSet, UserListCreateDetialView
from rest_framework.routers import SimpleRouter
from todo.serializers import CustomRegisterView
router = SimpleRouter(trailing_slash=False)
router.register("api/todos", TodoDetailViewSet)
router.register("api/users", UserListCreateDetialView)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(urls)),
    path('auth/', include('dj_rest_auth.urls')),
    # path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/registration/', CustomRegisterView.as_view(), name="registration"),
    path('drf/', include('rest_framework.urls')),
    path('', include(router.urls))
]
