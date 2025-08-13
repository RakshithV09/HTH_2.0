from rest_framework import serializers
from finance.models import Revenue, Expense

class RevenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revenue
        # Do NOT require user in POST; set it as read-only
        fields = ['id', 'source', 'amount', 'date', 'user']
        read_only_fields = ['id', 'user']


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'category', 'amount', 'date', 'user']
        read_only_fields = ['id', 'user']
