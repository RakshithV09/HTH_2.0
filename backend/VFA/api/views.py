# backend/VFA/api/views.py

from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum

from finance.models import Revenue, Expense
from .serializers import RevenueSerializer, ExpenseSerializer
from .models import Summary


# -------- Revenue ViewSet --------
class RevenueViewSet(viewsets.ModelViewSet):
    """
    API endpoint for viewing and adding Revenues.
    Only shows the authenticated user's revenues.
    """
    queryset = Revenue.objects.all()
    serializer_class = RevenueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # show only data for logged-in user
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # link created revenue to the logged-in user
        serializer.save(user=self.request.user)


# -------- Expense ViewSet --------
class ExpenseViewSet(viewsets.ModelViewSet):
    """
    API endpoint for viewing and adding Expenses.
    Only shows the authenticated user's expenses.
    """
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# -------- Summary Endpoint --------
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # ✅ Only authenticated users
def summary(request):
    """
    Return and also store a summary of:
    - Total Revenue
    - Total Expenses
    - Net Profit
    for the logged-in user.
    """
    user = request.user

    total_revenue = Revenue.objects.filter(user=user).aggregate(Sum('amount'))['amount__sum'] or 0
    total_expense = Expense.objects.filter(user=user).aggregate(Sum('amount'))['amount__sum'] or 0
    net_profit = total_revenue - total_expense

    # Store summary in DB
    Summary.objects.create(
        user=user,
        total_revenue=total_revenue,
        total_expense=total_expense,
        net_profit=net_profit
    )

    return Response({
        "total_revenue": total_revenue,
        "total_expense": total_expense,
        "net_profit": net_profit
    })
