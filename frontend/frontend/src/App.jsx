import { useState } from "react";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Dashboard from "./Dashboard";

export default function App() {
  // Current page: landing | login | signup | dashboard
  const [page, setPage] = useState("landing");
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sample KPI data for landing display
  const sampleKpis = [
    { name: "Revenue", value: 250000, color: "primary" },
    { name: "Expenses", value: 150000, color: "error" },
    { name: "Cash Flow", value: 100000, color: "success" },
    { name: "Profit Margin", value: 40, color: "secondary", suffix: "%" },
  ];

  // Handle login, set auth and go to dashboard
  const handleLogin = (credentials) => {
    // Replace with real auth call as needed
    setIsAuthenticated(true);
    setPage("dashboard");
  };

  // Handle signup, after success go to login page
  const handleSignUp = (formData) => {
    // Replace with real signup call as needed
    setPage("login");
  };

  // Handle logout and return to landing page
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPage("landing");
  };

  if (!isAuthenticated) {
    if (page === "login") {
      return (
        <LoginPage
          onLogin={handleLogin}
          onGoToSignUp={() => setPage("signup")}
        />
      );
    }
    if (page === "signup") {
      return (
        <SignUpPage
          onSignUp={handleSignUp}
          onGoToLogin={() => setPage("login")}
        />
      );
    }
    // landing page with project overview and navigation buttons
    return (
      <LandingPage
        sampleKpis={sampleKpis}
        onLoginClick={() => setPage("login")}
        onSignUpClick={() => setPage("signup")}
      />
    );
  }

  // User is authenticated: show dashboard with logout prop
  return <Dashboard onLogout={handleLogout} />;
}
