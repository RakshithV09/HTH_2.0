from django.contrib import admin
from .models import ExpenseAnomaly, RevenueForecast

@admin.register(ExpenseAnomaly)
class ExpenseAnomalyAdmin(admin.ModelAdmin):
    list_display = ('user', 'expense', 'detected_on', 'reason')
    list_filter = ('detected_on', 'user')
    search_fields = ('reason',)

@admin.register(RevenueForecast)
class RevenueForecastAdmin(admin.ModelAdmin):
    list_display = ('user', 'forecast_date', 'predicted_revenue', 'created_on')
    list_filter = ('forecast_date', 'user')
    search_fields = ('forecast_date',)
