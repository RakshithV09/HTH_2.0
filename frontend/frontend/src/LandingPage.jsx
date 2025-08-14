import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";

export default function LandingPage({ onLoginClick, onSignUpClick }) {
  // Sample KPI cards data
  const sampleKpis = [
    { name: "Revenue", value: 250000, suffix: "", color: "primary" },
    { name: "Expenses", value: 150000, suffix: "", color: "error" },
    { name: "Cash Flow", value: 100000, suffix: "", color: "success" },
    { name: "Profit Margin", value: 40, suffix: "%", color: "secondary" },
  ];

  const sectionTitleSx = {
    fontWeight: "bold",
    color: "#2575fc",
    mb: 1,
    mt: 3,
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto", fontFamily: "'Inter', sans-serif" }}>
      {/* Title */}
      <Typography variant="h3" align="center" gutterBottom sx={{ color: "#6a11cb", fontWeight: 900 }}>
        Virtual Financial Advisor — Project Overview
      </Typography>

      {/* Problem Statement */}
      <Typography variant="h4" sx={sectionTitleSx} gutterBottom>Problem Statement</Typography>
      <Typography sx={{ mb: 2 }}>
        Small and medium businesses often struggle to analyze and track their financial data effectively due to 
        disparate tools, lack of insights, and manual overhead. This leads to delayed decisions and missed opportunities.
      </Typography>

      {/* Abstract */}
      <Typography variant="h4" sx={sectionTitleSx} gutterBottom>Abstract</Typography>
      <Typography sx={{ mb: 2 }}>
        This project is an AI-powered financial analytics platform that unifies financial data securely, applies machine 
        learning-driven insights like anomaly detection and revenue forecasting, and visualizes key metrics in an interactive dashboard — 
        enabling fast and confident business decisions.
      </Typography>

      {/* Key Features */}
      <Typography variant="h4" sx={sectionTitleSx} gutterBottom>Key Features</Typography>
      <ul style={{ marginBottom: "25px" }}>
        <li>Secure user and role management</li>
        <li>Persistent backend storing finance, ML results, and summaries</li>
        <li>AI-driven anomaly and revenue forecast detection with history</li>
        <li>Colorful, responsive dashboard with rich visualizations</li>
        <li>Dark mode toggle for user comfort</li>
        <li>Real-time notifications and drill-down analytics</li>
        <li>Interactive motion backgrounds on authentication pages</li>
        <li>Robust form validation and password strength indicator</li>
        <li>User profile widget for personalization</li>
      </ul>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {sampleKpis.map((kpi) => (
          <Grid item xs={12} sm={6} md={3} key={kpi.name}>
            <Card
              sx={{
                background: kpi.color === "primary" ? "linear-gradient(135deg, #6a11cb, #2575fc)" :
                            kpi.color === "error" ? "linear-gradient(135deg, #ff6b6b, #ff8787)" :
                            kpi.color === "success" ? "linear-gradient(135deg, #4ECDC4, #45B7AF)" :
                            "linear-gradient(135deg, #f7971e, #ffd200)",
                color: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{kpi.name}</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {kpi.suffix ? `${kpi.value}${kpi.suffix}` : `₹ ${kpi.value.toLocaleString()}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Backend Summary */}
      <Typography variant="h4" sx={sectionTitleSx} gutterBottom>
  Backend Engineering by <span style={{ color: "#6a11cb" }}>[Rakshith Vadrevu]</span>
</Typography>

      <Typography sx={{ mb: 1 }}>
        <strong>1. User Management Setup:</strong> Django’s built-in User model, Profile model for extra data, user roles (Business Owner, Finance Team, Viewer) with Groups & Signals. Auto-assign "Viewer" role.
      </Typography>
      <Typography sx={{ mb: 1 }}>
        <strong>2. Apps:</strong> Finance app (revenues, expenses), ML app (anomalies, forecasts), API app (endpoints, summaries).
      </Typography>
      <Typography sx={{ mb: 1 }}>
        <strong>3. Data Flow:</strong> API/Admin data input → ML processing → Stored in DB → Historical tracking.
      </Typography>
      <Typography sx={{ mb: 1 }}>
        <strong>4. Admin Enhancements:</strong> Model registrations, bugs fixed, filters, IDs for debugging.
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <strong>Result:</strong> Persistent, trackable, and auditable backend powering financial insights.
      </Typography>

      {/* Frontend Summary */}
      <Typography variant="h4" sx={sectionTitleSx} gutterBottom>
        Frontend Development Journey by <span style={{ color: "#6a11cb" }}>[Ashraf Shaik Mohammed]</span>
      </Typography>
      <Typography sx={{ mb: 1 }}>
        <strong>1. Authentication Flow & UI:</strong> Login/signup with React + MUI, particle backgrounds, strong validation.
      </Typography>
      <Typography sx={{ mb: 1 }}>
        <strong>2. Dashboard:</strong> Sidebar, animated KPI cards, charts, filters, notifications.
      </Typography>
      <Typography sx={{ mb: 1 }}>
        <strong>3. Theming:</strong> Gradients, light/dark mode with ThemeProvider.
      </Typography>
      <Typography sx={{ mb: 1 }}>
        <strong>4. UX Enhancements:</strong> Form feedback, password strength, motion effects.
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <strong>5. User Profile Widget:</strong> Bottom-left quick profile with logout.
      </Typography>

      {/* Progress Recap Table */}
      <Typography variant="h4" sx={sectionTitleSx} gutterBottom>Visual Recap of Progress</Typography>
      <Box sx={{ overflowX: "auto", mb: 4 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif" }}>
          <thead>
            <tr style={{ backgroundColor: "#2575fc", color: "white" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Aspect</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Highlights</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Backend Setup</td>
              <td>User role automation, persistent ML results</td>
              <td>Reliable, auditable backend</td>
            </tr>
            <tr>
              <td>Data Flow</td>
              <td>API, DB storage, ML anomaly detections</td>
              <td>Real-time + historical data</td>
            </tr>
            <tr>
              <td>Dashboard</td>
              <td>Gradient KPIs, multiple charts</td>
              <td>Interactive, insightful UX</td>
            </tr>
            <tr>
              <td>Theming</td>
              <td>Light/Dark modes, vibrant palettes</td>
              <td>User-preferred viewing modes</td>
            </tr>
            <tr>
              <td>Motion Backgrounds</td>
              <td>Particles on auth pages</td>
              <td>Modern, engaging UI</td>
            </tr>
            <tr>
              <td>Validation & UX</td>
              <td>Form error feedback</td>
              <td>Smooth, error-free inputs</td>
            </tr>
            <tr>
              <td>User Profile Widget</td>
              <td>Bottom-left interactive avatar</td>
              <td>Convenient user controls</td>
            </tr>
          </tbody>
        </table>
      </Box>

      {/* Auth Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 6 }}>
        <Button variant="contained" onClick={onLoginClick} sx={{ backgroundColor: "#6a11cb" }}>
          Login
        </Button>
        <Button variant="outlined" onClick={onSignUpClick} sx={{ borderColor: "#6a11cb", color: "#6a11cb" }}>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
