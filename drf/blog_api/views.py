from rest_framework import generics
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, \
    DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly


class PostUserWritePermission(BasePermission):
    message = "Editing posts is restricted to the author only"

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class PostList(generics.ListCreateAPIView):
    #  isAdminUser = superuser
    # accept permissions from admin panel to users (ex: Group permissions)
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    # or read only
    queryset = Post.post_objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
