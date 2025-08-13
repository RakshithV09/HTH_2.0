from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status


class MLApiTest(TestCase):
    def setUp(self):
        # Create a test user and authenticate
        self.user = User.objects.create_user(username="ml_user", password="pass1234")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_anomaly_detection_authenticated(self):
        # Call anomaly detection endpoint
        response = self.client.get("/ml/anomalies/expenses/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("anomalies", response.data)
        self.assertIsInstance(response.data["anomalies"], list)

    def test_anomaly_detection_unauthenticated(self):
        # Log out to test unauthenticated access
        self.client.logout()
        response = self.client.get("/ml/anomalies/expenses/")
        # Accept both 401 Unauthorized and 403 Forbidden
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_forecast_authenticated(self):
        # Call forecast endpoint
        response = self.client.get("/ml/forecast/revenue/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("forecast", response.data)
        self.assertIsInstance(response.data["forecast"], list)

    def test_forecast_unauthenticated(self):
        # Log out to test unauthenticated access
        self.client.logout()
        response = self.client.get("/ml/forecast/revenue/")
        # Accept both 401 Unauthorized and 403 Forbidden
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])
