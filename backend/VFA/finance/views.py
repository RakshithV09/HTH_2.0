import pandas as pd
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import IntegrityError
from django.utils.dateparse import parse_date

from .models import Revenue, AccountsReceivable, AccountsPayable, BudgetVsActual
from .serializers import (
    AccountsReceivableSerializer,
    AccountsPayableSerializer,
    BudgetVsActualSerializer
)

# ---------------- CSV/JSON Upload for Revenues ----------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def upload_revenue_csv(request):
    """
    Accepts either:
    - multipart/form-data with a CSV file (key='file')
    - application/json with an array of revenue records
    """
    created_count = 0

    # ---------- Option 1: CSV file upload ----------
    if 'file' in request.FILES:
        file = request.FILES['file']
        try:
            df = pd.read_csv(file)
        except Exception as e:
            return Response({"error": f"Error reading CSV: {str(e)}"}, status=400)

        required_columns = {'source', 'amount', 'date'}
        if not required_columns.issubset(df.columns):
            return Response({"error": f"CSV must contain columns: {', '.join(required_columns)}"}, status=400)

        for _, row in df.iterrows():
            try:
                date_value = parse_date(str(row['date']))
                if not date_value:
                    continue
                Revenue.objects.create(
                    user=request.user,
                    source=row['source'],
                    amount=row['amount'],
                    date=date_value
                )
                created_count += 1
            except (IntegrityError, KeyError, ValueError):
                continue

        return Response({"status": "success", "records_created": created_count})

    # ---------- Option 2: JSON array upload ----------
    elif isinstance(request.data, list):
        for row in request.data:
            try:
                date_value = parse_date(str(row.get('date')))
                if not date_value:
                    continue
                Revenue.objects.create(
                    user=request.user,
                    source=row.get('source'),
                    amount=row.get('amount'),
                    date=date_value
                )
                created_count += 1
            except (IntegrityError, KeyError, ValueError):
                continue

        return Response({"status": "success", "records_created": created_count})

    # ---------- No file or valid JSON ----------
    return Response({"error": "No file uploaded or invalid JSON body"}, status=400)


# ---------------- Accounts Receivable ViewSet ----------------
class AccountsReceivableViewSet(viewsets.ModelViewSet):
    queryset = AccountsReceivable.objects.all()
    serializer_class = AccountsReceivableSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ---------------- Accounts Payable ViewSet ----------------
class AccountsPayableViewSet(viewsets.ModelViewSet):
    queryset = AccountsPayable.objects.all()
    serializer_class = AccountsPayableSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ---------------- Budget vs Actual ViewSet ----------------
class BudgetVsActualViewSet(viewsets.ModelViewSet):
    queryset = BudgetVsActual.objects.all()
    serializer_class = BudgetVsActualSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
