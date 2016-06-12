from django.db import models

class codetable(models.Model):
    key = models.CharField(max_length=20)
    code = models.TextField()
    language = models.CharField(max_length=20)