from pprint import pprint

from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.status import *

from .models import *
from .serializers import *


class TestView(APIView):
    def get(self, request):

        return Response({'test': 'test'})

    def post(self, request):
        print(request.data, "\n\n\n\n")

        pprint(request.data)
        return Response(request.data)


class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer



class ChatViewSet(ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        #response.data["last_message"] = Message.objects.filter(chat_id=response.data["id"]).last()

        return Response(response.data)


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    @action(detail=True, methods=['get'])
    def get_by_chat(self, request, pk):

        messages = Message.objects.filter(chat_id=pk).order_by('-date').values('id','text', 'date', 'answer_by')

        return Response(messages, status=HTTP_200_OK)




    @action(detail=False, methods=['post'])
    def receive(self, request):
        data = request.data['message']

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
            """отправляем в расу, принимаем ответ"""
            # answer = send_to_rasa(serializer.data)
            # if answer.is_rasa_can_solve is True:
            #     serializer.data['answer'] = answer.answer
            #     serializer.data['answer_by'] = answer.answer_by
            #     serializer.data['is_rasa_can_solve'] = answer.is_rasa_can_solve
            # else:
            #     serializer.data['is_rasa_can_solve'] = answer.is_rasa_can_solve
            #     иначе отправляем в генеративную модель
            #     send_to_gpt(serializer.data)
            # serializer.data['is_processed_rasa'] = True
            # serializer.save()

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
# Create your views here.
