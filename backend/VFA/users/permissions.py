# users/permissions.py
from rest_framework import permissions

class IsInGroup(permissions.BasePermission):
    """
    Allows access only to users in allowed groups or superuser.
    """
    allowed_groups = ['Business Owner', 'Finance Team']

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and (
                request.user.groups.filter(name__in=self.allowed_groups).exists()
                or request.user.is_superuser
            )
        )
