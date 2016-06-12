from django.conf.urls import include, url
from code_table.views import CompileAndRun , SaveCode, GetCode
from rest_framework import routers
router = routers.SimpleRouter()
urlpatterns = [
    url(r'^result', CompileAndRun.as_view()),
    url(r'^save', SaveCode.as_view()),
    url(r'^get_code', GetCode.as_view()),
    url(r'^', include(router.urls)),
]
