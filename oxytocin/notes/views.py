from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import NoteDetailSerializer
from .models import Notes

# Create your views here.
class NoteList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        note = Notes.objects.filter(author=user)
        serializer = NoteDetailSerializer(note, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = NoteDetailSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            # Set the user field to the current user before saving
            serializer.save(author=request.user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        

class NoteDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        note = Notes.objects.get(pk=pk)
        serializer = NoteDetailSerializer(note)
        return Response(serializer.data)

    def put(self, request, pk):
        note = Notes.objects.get(pk=pk)
        serializer = NoteDetailSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
    def delete(self, request, pk):
        note = Notes.objects.get(pk=pk)
        note.delete()
        return Response({"message": "Note deleted successfully"}, status=204)
        

