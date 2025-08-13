# users/signals.py
from django.db.models.signals import post_migrate, post_save
from django.contrib.auth.models import Group
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()

# 1️⃣ Create the default user roles after migrations
@receiver(post_migrate)
def create_user_roles(sender, **kwargs):
    roles = ["Business Owner", "Finance Team", "Viewer"]
    for role in roles:
        Group.objects.get_or_create(name=role)

# 2️⃣ Assign every new user to the "Viewer" group by default
@receiver(post_save, sender=User)
def assign_default_group(sender, instance, created, **kwargs):
    if created:
        default_group, _ = Group.objects.get_or_create(name='Viewer')
        instance.groups.add(default_group)

# 3️⃣ Create a Profile for every new user
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
