from django.db import models
from django.contrib.auth import get_user_model
from finance.models import Expense

User = get_user_model()

class ExpenseAnomaly(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expense = models.ForeignKey(Expense, on_delete=models.CASCADE)
    detected_on = models.DateTimeField(auto_now_add=True)
    reason = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Anomaly: {self.expense} on {self.detected_on}"

class RevenueForecast(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    forecast_date = models.DateField()
    predicted_revenue = models.DecimalField(max_digits=12, decimal_places=2)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Forecast {self.forecast_date}: {self.predicted_revenue}"
