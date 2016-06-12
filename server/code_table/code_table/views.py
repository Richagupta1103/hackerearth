from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests, random, string
from models import codetable


# api for compile and run

class CompileAndRun(APIView):

    def post(self, request):

        RUN_URL = 'http://api.hackerearth.com/code/run/'
        request.data['client_secret'] = 'ef01eee83b0251ca94f8012763b15273ba4705b3'
        r = requests.post(RUN_URL, data=request.data)
        response = r.json()
        return Response(response, status=status.HTTP_200_OK)


# api for saving the code
class SaveCode(APIView):

    def post(self, request):
        key = request.data.get('key', None)
        source_code = request.data['source']
        lang = request.data['lang']
        try:
            codetable.objects.filter(key=key, language=lang).delete()
            code_table_obj = codetable(key=key, code=source_code, language=lang)
            code_table_obj.save()
        except Exception as e:
            print e
            return Response({"error":"cannot save data with above data set"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(request.data, status=status.HTTP_200_OK)


# api for getting the code
class GetCode(APIView):

    def post(self, request):
        key = request.data.get('key', None)
        lang = request.data['lang']
        try:
            code_table_obj = codetable.objects.get(key=key, language=lang)
            response = {}
            if code_table_obj is not None:
                response['code'] = code_table_obj.code

        except Exception as e:
            print e
            return Response({"error":"cannot get data with above data set"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(response, status=status.HTTP_200_OK)
