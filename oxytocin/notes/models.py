
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Notes(models.Model):
    content = models.TextField()
    summary = models.TextField(blank=True)
    category = models.TextField(max_length=255, blank=True)
    date_last_modified = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    #date_created = models.DateTimeField(auto_now_add=True)
    is_categorized = models.BooleanField(default=False)

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    frequency = models.IntegerField(default=0)

    def __str__(self):
        return self.name
