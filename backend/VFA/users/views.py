from django.shortcuts import render
from users.decorators import group_required

@group_required('Business Owner', 'Finance Team')
def finance_dashboard(request):
    # view logic
    return render(request, "finance/dashboard.html")
