
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Notes(models.Model):
    content = models.TextField()
    summary = models.TextField(blank=True)
    date_last_modified = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    
    
