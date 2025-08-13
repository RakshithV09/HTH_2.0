from django.contrib import admin
from .models import Revenue, Expense, AccountsReceivable, AccountsPayable, BudgetVsActual
admin.site.register(Revenue)
admin.site.register(Expense)
# Plus any others you add
