from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests, urllib, json

class CompileAndRun(APIView):
    def post(self,request):

        COMPILE_URL = 'http://api.hackerearth.com/code/compile/'
        RUN_URL = 'http://api.hackerearth.com/code/run/'
        request.data['client_secret'] = 'ef01eee83b0251ca94f8012763b15273ba4705b3'
        r = requests.post(RUN_URL, data=request.data)
        response = r.json()
        return Response(response, status=status.HTTP_200_OK)