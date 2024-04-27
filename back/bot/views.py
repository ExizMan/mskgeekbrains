from pprint import pprint

from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.status import *
import requests

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

        result = [resp for resp in response.data if resp['last_massage'] is not None]

        return Response(result)


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    @action(detail=True, methods=['get'])
    def get_by_chat(self, request, pk):
        messages = Message.objects.filter(chat_id=pk).order_by('date').values('id','text', 'date', 'answer_by','usertg_id')
        return Response(messages, status=HTTP_200_OK)





    @action(detail=False, methods=['post'])
    def receive(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            message = serializer.data['text']
            try:
                response = requests.post('http://localhost:5005/webhooks/rest/webhook', json={'message': message})
                if response.status_code == 200 and response.json():
                    answer = response.json()['text']
                    serializer.data['text'] = answer
                    serializer.data['is_rasa_can_solve'] = True
                else:
                    serializer.data['is_rasa_can_solve'] = False
                serializer.data['is_processed_rasa'] = True
                serializer.save()
            except Exception as e:
                return Response(e, status=HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
            
