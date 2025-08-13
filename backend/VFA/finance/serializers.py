from rest_framework import serializers
from .models import AccountsReceivable, AccountsPayable, BudgetVsActual
from rest_framework import serializers

class CSVUploadSerializer(serializers.Serializer):
    file = serializers.FileField(required=True)

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