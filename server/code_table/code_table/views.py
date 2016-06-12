from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests, urllib, json

class CompileAndRun(APIView):
    def post(self,request):

        COMPILE_URL = 'http://api.hackerearth.com/code/compile/'
        RUN_URL = 'http://api.hackerearth.com/code/run/'
        if request.data['async'] == 0:

            print request.data
            r = requests.post(RUN_URL, data=request.data)
            response = r.json()
            return Response(response, status=status.HTTP_200_OK)
        else:
            request.data['id'] = 23
            request.data['callback'] = 'http://127.0.0.1:8000/hackerearth-response'
            post_data = urllib.urlencode(request.data)
            response = urllib.urlopen(RUN_URL, post_data)
            print "post_data: ", post_data
            print response
            return Response(response, status=status.HTTP_200_OK)


class CompileResponse(APIView):

    import pdb;pdb.set_trace()
    def api_response(self,request):
        payload = request.POST.get('payload', '')

        """
        This payload is in JSON format. You need to load it using
        native method to convert it into dictionary for easy operations
        later on.
        """
        payload = json.loads(payload)
        print payload

        """
        Payload Format:
        {u'errors': {}, u'code_id': u'4c384aM', u'web_link': u'http://code.hackerearth.com/4c384aM', u'compile_status': u'OK', u'id': u'123456', u'async': 1, u'run_status': {u'status': u'AC', u'memory_used': u'64', u'output_html': u'Hello
    1
    ', u'time_used': u'0.1006', u'signal': u'OTHER', u'status_detail': u'N/A', u'output': u'Hello\\n1\\n'}, u'message': u'OK'}
        """

        run_status = payload.get('run_status')
        o = run_status['output']
        print o

        """
        Output:
        Hello
        1
        """
        return Response(o, status=status.HTTP_200_OK)