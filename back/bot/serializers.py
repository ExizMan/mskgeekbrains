from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import *


class MessageSerializer(ModelSerializer):
    user_id = serializers.IntegerField(source='tg_id')
    class Meta:
        model = Message
        fields = '__all__'


class ChatSerializer(ModelSerializer):


    class Meta:
        model = Chat
        fields = '__all__'


class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


