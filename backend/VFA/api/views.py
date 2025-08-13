from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum

from finance.models import Revenue, Expense
from .serializers import RevenueSerializer, ExpenseSerializer


# -------- Revenue ViewSet --------
class RevenueViewSet(viewsets.ModelViewSet):
    queryset = Revenue.objects.all()  # Required for DRF router
    serializer_class = RevenueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# -------- Expense ViewSet --------
class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# -------- Summary Endpoint --------
@api_view(['GET'])
def summary(request):
    total_revenue = Revenue.objects.filter(user=request.user).aggregate(Sum('amount'))['amount__sum'] or 0
    total_expense = Expense.objects.filter(user=request.user).aggregate(Sum('amount'))['amount__sum'] or 0
    net_profit = total_revenue - total_expense

    return Response({
        "total_revenue": total_revenue,
        "total_expense": total_expense,
        "net_profit": net_profit
    })

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum
from finance.models import Revenue, Expense

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # ✅ Only allow logged-in users
def summary(request):
    total_revenue = Revenue.objects.filter(user=request.user).aggregate(Sum('amount'))['amount__sum'] or 0
    total_expense = Expense.objects.filter(user=request.user).aggregate(Sum('amount'))['amount__sum'] or 0
    net_profit = total_revenue - total_expense

    return Response({
        "total_revenue": total_revenue,
        "total_expense": total_expense,
        "net_profit": net_profit
    })
