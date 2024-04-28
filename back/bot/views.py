from pprint import pprint

from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.status import *
import requests
import socket
from .models import *
from .serializers import *
bot_token = '6916545851:AAFOPf6J-3rO9gNjotHOXJdr3QI-zqtwk4E'

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

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('usertg_id')
        if Student.objects.filter(usertg_id=user_id).exists():
            return Response({'message': 'usertg_id is exists'}, status=HTTP_200_OK)
        return super().create(request, *args, **kwargs)



class ChatViewSet(ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        result = [resp for resp in response.data if resp['last_massage'] is not None]

        return Response(result)

    def create(self, request, *args, **kwargs):
        chat_id = request.data.get('id')
        if Chat.objects.filter(id=chat_id).exists():
            return Response({'message': 'chat_id is exists'}, status=HTTP_200_OK)
        return super().create(request, *args, **kwargs)



class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def send_telegram_message(self,bot_token, chat_id, text):
        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        params = {
            'chat_id': chat_id,
            'text': text
        }
        response = requests.get(url, params=params)

        if response.status_code == 200:
            print("Message sent successfully")
        else:
            print("Failed to send message")


    def create(self, request, *args, **kwargs):
        chat_id = request.data.get('chat_id')
        text = request.data.get('text')
        self.send_telegram_message(bot_token, chat_id, text)
        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=['get'])
    def get_by_chat(self, request, pk):
        messages = Message.objects.filter(chat_id=pk).order_by('date').values('id','text', 'date', 'answer_by','usertg_id')
        return Response(messages, status=HTTP_200_OK)





    @action(detail=False, methods=['post'])
    def receive(self, request):
        print(request.data)
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():

            serializer.save(answer_by='student')
            data = serializer.data
            new_data = {}
            message = serializer.data['text']
            print(message)
            try:
                response = requests.post('http://192.168.1.218:5005/webhooks/rest/webhook', json={'message': message})
                print(response.json())
                if len(response.json()) > 0:

                    answer = response.json()[0]['text']
                    print(answer)
                    new_data['answer'] = data['text']
                    new_data = data
                    new_data['text'] = answer


                    new_data['is_rasa_can_solve'] = True
                    new_data['answer_by'] = 'rasa'
                    new_data['is_processed_rasa'] = True
                    serializer = self.serializer_class(data=new_data)
                    if serializer.is_valid():
                        serializer.save()
                else:

                    new_data['is_rasa_can_solve'] = False

                    new_data['is_processed_rasa'] = True
                    serializer = self.serializer_class(instance=data, data=new_data)
                    if serializer.is_valid():
                        serializer.save()
                print('попытка0')
            except Exception as e:
                return Response(str(e), status=HTTP_400_BAD_REQUEST)
            print('попытка')
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer



    @action(detail=True, methods=['get'])
    def get_by_observer(self, request, pk):
        reviews = Review.objects.filter(observer_id=pk).values('observer', 'rate', 'description')
        return Response(reviews, status=HTTP_200_OK)
            
