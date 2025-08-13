from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    AccountsReceivableViewSet,
    AccountsPayableViewSet,
    BudgetVsActualViewSet,
    upload_revenue_csv,
)

# Create a DRF router for ViewSets
router = DefaultRouter()
router.register(r'accounts-receivable', AccountsReceivableViewSet)
router.register(r'accounts-payable', AccountsPayableViewSet)
router.register(r'budget-vs-actual', BudgetVsActualViewSet)

# URL patterns for function-based views + router URLs
urlpatterns = [
    # CSV upload endpoint
    path('upload-revenue-csv/', upload_revenue_csv, name='upload-revenue-csv'),
]

# Add the automatically generated router URLs
urlpatterns += router.urls
