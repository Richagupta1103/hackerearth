from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests

class CompileAndRun(APIView):
    def post(self,request):
        RUN_URL = u'http://api.hackerearth.com/code/run/'
        print request.data
        r = requests.post(RUN_URL, data=request.data)
        response = r.json()
        return Response(response, status=status.HTTP_200_OK)