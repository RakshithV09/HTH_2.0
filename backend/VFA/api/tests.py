from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from finance.models import Revenue

class RevenueAPITest(TestCase):
    def setUp(self):
        # Create test user
        self.user = User.objects.create_user(username="testuser", password="pass1234")
        self.client = APIClient()
        # Force authenticate so DRF sees request as logged in
        self.client.force_authenticate(user=self.user)

    def test_create_revenue(self):
        payload = {
            "source": "Sales",
            "amount": "1000.00",
            "date": "2025-08-13"
        }
        response = self.client.post("/api/revenues/", payload, format="json")
        print("DEBUG POST RESPONSE:", response.data)  # For debugging
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Revenue.objects.count(), 1)

    def test_summary_endpoint(self):
        Revenue.objects.create(user=self.user, source="Sales", amount=500, date="2025-08-13")
        response = self.client.get("/summary/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("total_revenue", response.data)
