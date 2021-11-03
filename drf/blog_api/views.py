from django.db.models import query
from rest_framework import generics, serializers
from rest_framework import permissions
from rest_framework.decorators import permission_classes
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS, AllowAny, BasePermission, IsAdminUser, \
    DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly, IsAuthenticated
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import filters


class PostList(generics.ListAPIView):

    serializer_class = PostSerializer
    queryset = Post.objects.all()

class PostDetail(generics.RetrieveAPIView):

    serializer_class = PostSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Post, slug=item)

    
# Post Search
class PostListDetailFilter(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']

     # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.

# Post Admin
class CreatePost(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer = PostSerializer


class AdminPostDestail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer = PostSerializer


class EditPost(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer = PostSerializer


class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer = PostSerializer
