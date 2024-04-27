from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import *


class MessageSerializer(ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'


class ChatSerializer(ModelSerializer):
    last_massage = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Chat
        fields = '__all__'
    def get_last_massage(self, obj):
        return Message.objects.filter(chat_id=obj.id).last().text

    def get_username(self, obj):
        return Student.objects.get(usertg_id=obj.id).username


class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


