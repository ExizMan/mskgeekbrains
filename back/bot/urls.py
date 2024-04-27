from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('student', StudentViewSet)
router.register('chat', ChatViewSet)
router.register('message', MessageViewSet)



urlpatterns = [
    path('test/', TestView.as_view()),
    path('api/', include(router.urls))

]