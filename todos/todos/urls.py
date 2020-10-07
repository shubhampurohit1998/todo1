
from django.contrib import admin
from django.urls import path, include, re_path
# from dj_rest_auth.registration.views import VerifyEmailView
from todo.views import TodoDetailViewSet, UserListCreateDetialView, NotificationViewSet
from rest_framework.routers import SimpleRouter
from todo.serializers import CustomRegisterView
router = SimpleRouter(trailing_slash=False)
router.register("api/todos", TodoDetailViewSet)
router.register("api/users", UserListCreateDetialView)
router.register("api/notifications", NotificationViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('dj_rest_auth.urls')),
    # path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/registration/', CustomRegisterView.as_view(), name="registration"),
    path('drf/', include('rest_framework.urls')),
    path('', include(router.urls)),
    # re_path(r'^account-confirm-email/', VerifyEmailView.as_view(),
    #         name='account_email_verification_sent'),
    # re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(),
    #         name='account_confirm_email'),
]
