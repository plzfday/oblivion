from django.contrib.auth.models import User
from django.db import models

class Notes(models.Model):
    title = models.CharField(max_length=100, default='Untitled')
    content = models.TextField()
    date_last_modified = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)