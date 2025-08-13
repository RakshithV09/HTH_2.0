# finance/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RevenueViewSet,
    upload_revenue_csv,
    AccountsReceivableViewSet,
    AccountsPayableViewSet,
    BudgetVsActualViewSet,
    restricted_summary,
    check_user_role,
)

router = DefaultRouter()
router.register(r'revenues', RevenueViewSet, basename='revenue')
router.register(r'accounts-receivable', AccountsReceivableViewSet, basename='accounts-receivable')
router.register(r'accounts-payable', AccountsPayableViewSet, basename='accounts-payable')
router.register(r'budget-vs-actual', BudgetVsActualViewSet, basename='budget-vs-actual')

urlpatterns = [
    path('upload-revenues/', upload_revenue_csv, name='upload-revenue-csv'),
    path('restricted-summary/', restricted_summary, name='restricted-summary'),
    path('check-role/', check_user_role, name='check-user-role'),
    path('', include(router.urls)),
]
