# ml/urls.py
from django.urls import path
from .views import expense_anomalies, revenue_forecast

urlpatterns = [
    path('anomalies/expenses/', expense_anomalies, name='expense-anomalies'),
    path('forecast/revenue/', revenue_forecast, name='revenue-forecast'),
]
