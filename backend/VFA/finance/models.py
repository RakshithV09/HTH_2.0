from django.db import models
from django.contrib.auth.models import User

class Revenue(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    source = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateField()

class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateField()

class AccountsReceivable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    client = models.CharField(max_length=100)
    amount_due = models.DecimalField(max_digits=12, decimal_places=2)
    due_date = models.DateField()

class AccountsPayable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vendor = models.CharField(max_length=100)
    amount_owed = models.DecimalField(max_digits=12, decimal_places=2)
    due_date = models.DateField()

class BudgetVsActual(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    period = models.CharField(max_length=50) # e.g., "Jan 2025"
    budgeted_amount = models.DecimalField(max_digits=12, decimal_places=2)
    actual_amount = models.DecimalField(max_digits=12, decimal_places=2)
    
class AccountsReceivable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    client = models.CharField(max_length=255)
    amount_due = models.DecimalField(max_digits=12, decimal_places=2)
    due_date = models.DateField()

class AccountsPayable(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vendor = models.CharField(max_length=255)
    amount_owed = models.DecimalField(max_digits=12, decimal_places=2)
    due_date = models.DateField()

class BudgetVsActual(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    period = models.CharField(max_length=50)  # e.g., "Jan 2025"
    budgeted_amount = models.DecimalField(max_digits=12, decimal_places=2)
    actual_amount = models.DecimalField(max_digits=12, decimal_places=2)