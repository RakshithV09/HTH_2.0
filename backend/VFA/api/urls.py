from rest_framework.routers import DefaultRouter
from .views import RevenueViewSet, ExpenseViewSet, summary
from finance.views import upload_revenue_csv
from django.urls import path

router = DefaultRouter()
router.register(r'revenues', RevenueViewSet)
router.register(r'expenses', ExpenseViewSet)

urlpatterns = [
    path('summary/', summary),
]
urlpatterns += router.urls
urlpatterns += [
    path('upload-revenue/', upload_revenue_csv),
]