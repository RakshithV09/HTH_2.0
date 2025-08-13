from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    AccountsReceivableViewSet,
    AccountsPayableViewSet,
    BudgetVsActualViewSet,
    upload_revenue_csv,
    upload_accounts_receivable_csv,
    upload_accounts_payable_csv,
    upload_budget_vs_actual_csv
)

router = DefaultRouter()
router.register(r'accounts-receivable', AccountsReceivableViewSet)
router.register(r'accounts-payable', AccountsPayableViewSet)
router.register(r'budget-vs-actual', BudgetVsActualViewSet)

urlpatterns = [
    path('upload-revenue-csv/', upload_revenue_csv, name='upload-revenue-csv'),
    path('upload-accounts-receivable-csv/', upload_accounts_receivable_csv, name='upload-accounts-receivable-csv'),
    path('upload-accounts-payable-csv/', upload_accounts_payable_csv, name='upload-accounts-payable-csv'),
    path('upload-budget-vs-actual-csv/', upload_budget_vs_actual_csv, name='upload-budget-vs-actual-csv'),
]

urlpatterns += router.urls
