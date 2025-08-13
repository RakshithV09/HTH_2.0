# finance/views.py
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
    RevenueSerializer,
    AccountsReceivableSerializer,
    AccountsPayableSerializer,
    BudgetVsActualSerializer,
    CSVUploadSerializer
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
# finance/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.utils import is_viewer, get_user_groups

# Example in finance/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.utils import is_viewer, get_user_groups

@api_view(['GET'])
def check_user_role(request):
    if is_viewer(request.user):
        print("This is a viewer")

    groups = get_user_groups(request.user)
    print(groups)  # will log in console

    return Response({
        "username": request.user.username,
        "groups": groups
    })

@api_view(['GET'])
def check_user_role(request):
    if is_viewer(request.user):
        print("This is a viewer")
    print(get_user_groups(request.user))
    return Response({
        "groups": get_user_groups(request.user)
    })
    
@api_view(['GET'])
def my_view(request):
    if request.user.groups.filter(name='Viewer').exists():
        return Response({"role": "Viewer"})
    elif request.user.groups.filter(name='Business Owner').exists():
        return Response({"role": "Business Owner"})
    elif request.user.groups.filter(name='Finance Team').exists():
        return Response({"role": "Finance Team"})
    else:
        return Response({"role": "No group assigned"})

# ✅ Custom role-based permission
from users.permissions import IsInGroup


# -------- Restricted function-based view example --------
@api_view(['GET'])
@permission_classes([IsInGroup])  # Only Business Owner & Finance Team
def restricted_summary(request):
    return Response({"message": "You have permission to view this!"})


# ---------------- Revenue ViewSet ----------------
class RevenueViewSet(viewsets.ModelViewSet):
    queryset = Revenue.objects.all()
    serializer_class = RevenueSerializer
    permission_classes = [IsAuthenticated]  # default for all actions unless overridden

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # ✅ Restrict only 'create' action
    def get_permissions(self):
        if self.action == 'create':
            return [IsInGroup()]
        return super().get_permissions()
    def list(self, request, *args, **kwargs):
        user_groups = list(request.user.groups.values_list('name', flat=True))
        print("User groups:", user_groups)  # debug in console
        return super().list(request, *args, **kwargs)

# ---------------- CSV/JSON Upload for Revenues ----------------
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsInGroup])  # Only specific roles upload revenues
@parser_classes([MultiPartParser, FormParser, JSONParser])
def upload_revenue_csv(request):
    created_count = 0

    if 'file' in request.FILES:
        serializer = CSVUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']

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

    return Response({"error": "No file uploaded or invalid JSON body"}, status=400)


# ---------------- Accounts Receivable ViewSet ----------------
class AccountsReceivableViewSet(viewsets.ModelViewSet):
    queryset = AccountsReceivable.objects.all()
    serializer_class = AccountsReceivableSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ---------------- Accounts Payable ViewSet ----------------
class AccountsPayableViewSet(viewsets.ModelViewSet):
    queryset = AccountsPayable.objects.all()
    serializer_class = AccountsPayableSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ---------------- Budget vs Actual ViewSet ----------------
class BudgetVsActualViewSet(viewsets.ModelViewSet):
    queryset = BudgetVsActual.objects.all()
    serializer_class = BudgetVsActualSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
