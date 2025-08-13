from django.contrib.auth.decorators import user_passes_test

def group_required(*group_names):
    """Requires user membership in at least one of the groups passed in."""
    def in_groups(u):
        if u.is_authenticated:
            # Check if user is in any of the allowed groups or is a superuser
            if u.groups.filter(name__in=group_names).exists() or u.is_superuser:
                return True
        return False
    return user_passes_test(in_groups)
