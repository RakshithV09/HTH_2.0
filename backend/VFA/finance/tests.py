from io import BytesIO
import pandas as pd
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from finance.models import AccountsReceivable, AccountsPayable, BudgetVsActual, Revenue


class FinanceAPITest(TestCase):
    def setUp(self):
        # Create test user & authenticate
        self.user = User.objects.create_user(username="fin_user", password="pass1234")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    # ---------- Accounts Receivable ----------
    def test_create_accounts_receivable(self):
        payload = {
            "client": "ABC Corp",
            "amount_due": "1500.00",
            "due_date": "2025-08-30"
        }
        response = self.client.post("/finance/accounts-receivable/", payload, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(AccountsReceivable.objects.count(), 1)
        self.assertEqual(AccountsReceivable.objects.first().client, "ABC Corp")

    # ---------- Accounts Payable ----------
    def test_create_accounts_payable(self):
        payload = {
            "vendor": "XYZ Supplies",
            "amount_owed": "2500.00",
            "due_date": "2025-09-15"
        }
        response = self.client.post("/finance/accounts-payable/", payload, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(AccountsPayable.objects.count(), 1)
        self.assertEqual(AccountsPayable.objects.first().vendor, "XYZ Supplies")

    # ---------- Budget vs Actual ----------
    def test_create_budget_vs_actual(self):
        payload = {
            "period": "Aug 2025",
            "budgeted_amount": "5000.00",
            "actual_amount": "4800.00"
        }
        response = self.client.post("/finance/budget-vs-actual/", payload, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(BudgetVsActual.objects.count(), 1)
        self.assertEqual(BudgetVsActual.objects.first().period, "Aug 2025")

    # ---------- CSV Upload for Revenue ----------
    def test_upload_revenue_csv(self):
        # Create a sample CSV in memory
        data = pd.DataFrame([
            {"source": "Online Sales", "amount": 3000.00, "date": "2025-08-01"},
            {"source": "Consulting", "amount": 1500.00, "date": "2025-08-05"},
        ])
        csv_buffer = BytesIO()
        data.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)

        response = self.client.post(
            "/finance/upload-revenue-csv/",
            {"file": csv_buffer},
            format="multipart"
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("records_created", response.data)
        self.assertEqual(Revenue.objects.count(), 2)  # Two records from CSV
