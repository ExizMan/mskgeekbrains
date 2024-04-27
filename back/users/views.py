from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserRegisterSerializer, LoginSerializer, \
    UpdateTokensSerializer, UserHeaderSerializer
from .models import User

class UserMe(APIView):
    #permission_classes = [IsAuthenticated, ]

    def get(self, request):
        print(123, request.COOKIES)
        token = request.COOKIES["refresh_token"]
        user = User.objects.filter(refresh_token=token).first()

        serializer = UserHeaderSerializer(instance=user)

        return Response(serializer.data)
    def put(self, request):
        data = request.data
        token = request.COOKIES["refresh_token"]
        user = User.objects.filter(refresh_token=token).first()
        serializer = UserHeaderSerializer(instance=user, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterSendOTPView(GenericAPIView):
    serializer_class = UserRegisterSerializer
    authentication_classes = []

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_data = serializer.data

            # send_generated_otp_to_email(user_data['email'], request)
            return Response({
                'data': user_data,

            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SetDataToUser(APIView):
    # permission_classes = [IsAuthenticated, ]

    def get(self, request, **kwargs):
        pk = kwargs.get("pk", None)
        instance = User.objects.get(pk=pk)
        serializer = UserRegisterSerializer(instance=instance)
        return (Response({
            'data': serializer.data,
        }, status=status.HTTP_200_OK)
        )

    def put(self, request, **kwargs):
        pk = kwargs.get("pk", None)
        instance = User.objects.get(pk=pk)
        print(instance)
        serializer = UserRegisterSerializer(instance=instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'data': serializer.data,

            }, status=status.HTTP_200_OK)

        return Response({
            'data': serializer.errors,

        }, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, **kwargs):
        return self.put(request, **kwargs)




class LoginUserView(GenericAPIView):
    serializer_class = LoginSerializer
    authentication_classes = []

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        resp = Response({"access_token": serializer.data['access_token']}, status=status.HTTP_200_OK)
        resp.set_cookie('refresh_token', serializer.data['refresh_token'], path='/', secure=False, httponly=True)
        return resp


class UpdateTokens(GenericAPIView):
    serializer_class = UpdateTokensSerializer
    permission_classes = [AllowAny, ]
    authentication_classes = []

    def get(self, request):
        print(request.COOKIES)
        try:
            refresh_token = request.COOKIES['refresh_token']

            serializer = self.serializer_class(data=request.COOKIES, context={'refresh_token': refresh_token})
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"Erroro": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        resp = Response({"access_token": serializer.data['access_token']}, status=status.HTTP_200_OK)
        resp.set_cookie('refresh_token', serializer.data['refresh_token'], path='/', secure=False, httponly=True)
        return resp


