from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = "List all usernames and their groups"

    def handle(self, *args, **options):
        users = User.objects.all()

        if not users.exists():
            self.stdout.write("No users found.")
            return

        for user in users:
            # Get list of groups for this user
            groups = list(user.groups.values_list('name', flat=True))
            groups_display = ", ".join(groups) if groups else "No Groups"
            
            self.stdout.write(f"User: {user.username} | Groups: {groups_display}")
