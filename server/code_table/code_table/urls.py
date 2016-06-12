from django.conf.urls import include, url
from code_table.views import CompileAndRun, CompileResponse
from rest_framework import routers
router = routers.SimpleRouter()
urlpatterns = [
    url(r'^result', CompileAndRun.as_view()),
    url(r'^hackerearth-response', CompileResponse.as_view()),
    url(r'^', include(router.urls)),
]
