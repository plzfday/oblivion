

from django.urls import path
from .views import NoteList, NoteDetail, CalculateStats

urlpatterns=[
    path("", NoteList.as_view()),
    path("<int:pk>/", NoteDetail.as_view()),
    path("stat/", CalculateStats.as_view())
]
