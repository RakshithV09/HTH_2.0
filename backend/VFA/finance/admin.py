from django.contrib import admin
from .models import Revenue, Expense, AccountsReceivable, AccountsPayable, BudgetVsActual
admin.site.register(Revenue)
admin.site.register(Expense)
# Plus any others you add
@admin.register(AccountsReceivable)
class AccountsReceivableAdmin(admin.ModelAdmin):
    list_display = ('client', 'amount_due', 'due_date', 'user')

@admin.register(AccountsPayable)
class AccountsPayableAdmin(admin.ModelAdmin):
    list_display = ('vendor', 'amount_owed', 'due_date', 'user')

@admin.register(BudgetVsActual)
class BudgetVsActualAdmin(admin.ModelAdmin):
    list_display = ('period', 'budgeted_amount', 'actual_amount', 'user')