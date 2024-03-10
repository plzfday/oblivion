from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import NoteDetailSerializer
from .models import Notes, Category
from .category_decider import get_category_from_gpt

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
        category_name = Notes.objects.get(pk=pk).category
        category = Category.objects.filter(name=category_name).first()
        category.frequency -= 1
        category.save()

        note = Notes.objects.get(pk=pk)
        category = ''
        is_categorized = False
        serializer = NoteDetailSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save(category=category, is_categorized=is_categorized)
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
    def delete(self, request, pk):
        note = Notes.objects.get(pk=pk)
        category_name = note.category
        category = Category.objects.filter(name=category_name).first()
        if category:
            category.frequency -= 1
            category.save()

        note.delete()
        return Response({"message": "Note deleted successfully"}, status=204)
        
class CalculateStats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        uncategorized_notes = Notes.objects.filter(is_categorized=False)
        for note in uncategorized_notes:
            category_name = get_category_from_gpt(note.content)
            category = Category.objects.get(name=category_name)
            category.frequency += 1
            category.save()
            note.category = category.name
            note.is_categorized = True
            note.save()
        
        categories = Category.objects.all()
        category_data = {}
        for category in categories:
            category_data[category.name] = category.frequency
        return Response(category_data)
    
