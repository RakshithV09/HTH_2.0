from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class Summary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_revenue = models.DecimalField(max_digits=12, decimal_places=2)
    total_expense = models.DecimalField(max_digits=12, decimal_places=2)
    net_profit = models.DecimalField(max_digits=12, decimal_places=2)
    generated_on = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Summary for {self.user} on {self.generated_on.strftime('%Y-%m-%d %H:%M')}"
