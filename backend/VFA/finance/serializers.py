from rest_framework import serializers
from .models import AccountsReceivable, AccountsPayable, BudgetVsActual

class AccountsReceivableSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountsReceivable
        fields = '__all__'
        read_only_fields = ['user']

class AccountsPayableSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountsPayable
        fields = '__all__'
        read_only_fields = ['user']

class BudgetVsActualSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetVsActual
        fields = '__all__'
        read_only_fields = ['user']