from django.contrib import admin
from .models import Summary

@admin.register(Summary)
class SummaryAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_revenue', 'total_expense', 'net_profit', 'generated_on')
    list_filter = ('user', 'generated_on')
