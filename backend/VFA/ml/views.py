# ml/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from finance.models import Expense, Revenue

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def expense_anomalies(request):
    expenses = Expense.objects.filter(user=request.user).order_by('date')
    amounts = [expense.amount for expense in expenses]
    # Simple Z-score anomaly detection or other logic here
    mean = sum(amounts)/len(amounts) if amounts else 0
    anomalies = [x for x in amounts if abs(x - mean) > 2 * (mean or 1)]  # simplistic example
    return Response({"anomalies": anomalies})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def revenue_forecast(request):
    revenues = Revenue.objects.filter(user=request.user).order_by('date')
    amounts = [revenue.amount for revenue in revenues]
    # Simple moving average forecast example
    window = 3
    forecast = []
    for i in range(len(amounts)):
        if i < window:
            forecast.append(amounts[i])
        else:
            forecast.append(sum(amounts[i-window:i])/window)
    return Response({"forecast": forecast})
