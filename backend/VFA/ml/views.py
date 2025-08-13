# ml/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import date, timedelta

from finance.models import Expense, Revenue
from .models import ExpenseAnomaly, RevenueForecast


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def expense_anomalies(request):
    """
    Detect anomalies in expenses for the logged-in user,
    save them to ExpenseAnomaly table for admin visibility.
    """
    user = request.user

    # Optional: Clean old anomalies for this user before saving new ones
    ExpenseAnomaly.objects.filter(user=user).delete()

    expenses = Expense.objects.filter(user=user).order_by('date')
    amounts = [expense.amount for expense in expenses]

    # Avoid division by zero
    mean = sum(amounts) / len(amounts) if amounts else 0
    anomalies = []

    for expense in expenses:
        if abs(expense.amount - mean) > 2 * (mean or 1):  # Simple anomaly rule
            anomalies.append(expense.amount)

            # Save anomaly to DB (avoid duplication within the same run)
            ExpenseAnomaly.objects.get_or_create(
                user=user,
                expense=expense,
                defaults={'reason': 'Amount deviates significantly from mean'}
            )

    return Response({"anomalies": anomalies})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def revenue_forecast(request):
    """
    Predict revenue for the logged-in user using a simple moving average,
    save results to RevenueForecast table for admin visibility.
    """
    user = request.user

    # Optional: Clean old forecasts for this user before saving new ones
    RevenueForecast.objects.filter(user=user).delete()

    revenues = Revenue.objects.filter(user=user).order_by('date')
    amounts = [revenue.amount for revenue in revenues]

    window = 3  # Moving average window size
    forecast = []
    start_date = date.today()

    for i in range(len(amounts)):
        if i < window:
            predicted_value = amounts[i]
        else:
            predicted_value = sum(amounts[i - window:i]) / window

        forecast.append(predicted_value)

        # Save forecast result in DB
        RevenueForecast.objects.create(
            user=user,
            forecast_date=start_date + timedelta(days=30 * i),  # Monthly steps
            predicted_revenue=predicted_value
        )

    return Response({"forecast": forecast})
