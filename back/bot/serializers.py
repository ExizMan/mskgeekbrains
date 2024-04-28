from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.db.models import Avg
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

class ReviewSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class StatisticsSerializer(ModelSerializer):
    avg_review_rate = serializers.SerializerMethodField(read_only=True)
    avg_speed_answer = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Statistics
        fields = '__all__'

    def get_avg_review_rate(self, obj):
        if Review.objects.filter(observer=obj.observer).exists():
            return Review.objects.filter(observer=obj.observer).aggregate(Avg('rate'))
        return None
    def get_avg_speed_answer(self, obj):
        messages = Message.objects.filter(observer=obj.observer)
        answered_to = messages.filter(answer_by='observer')
        questions = messages.filter(answer_by='student')

        return None