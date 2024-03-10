from rest_framework.serializers import ModelSerializer
from .models import Notes



class NoteDetailSerializer(ModelSerializer):
    class Meta:
        model = Notes
        fields = ('id', 'content', 'summary', 'date_last_modified', 'category','is_categorized')
