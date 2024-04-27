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
        if Message.objects.filter(chat_id=obj.id).exists():
            return Message.objects.filter(chat_id=obj.id).last().text
        return None

    def get_username(self, obj):
        if Student.objects.filter(usertg_id=obj.id).exists():
            return Student.objects.get(usertg_id=obj.id).firstname
        return None


class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


