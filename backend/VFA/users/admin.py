# users/admin.py
from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'extra_field', 'phone_number', 'address', 'created_at')
    list_filter = ('created_at', 'user')
    search_fields = ('user__username', 'user__email', 'extra_field', 'phone_number')
