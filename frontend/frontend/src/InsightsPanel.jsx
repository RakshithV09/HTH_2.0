import { Card, CardContent, Typography, Grid, Alert } from "@mui/material";

function InsightsPanel() {
  // Dummy data — replace with AI-generated data from backend later
  const profitMargin = 40; // in percentage
  const lastAnomaly = "Marketing expenses spiked by 25% in May";
  const recommendation = "Consider reducing operations cost by 10% to improve cash flow.";

  return (
    <Grid container spacing={3} style={{ marginTop: "10px" }}>
      {/* Profit Margin Card */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Profit Margin</Typography>
            <Typography variant="h4" color="primary">
              {profitMargin}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Last Anomaly Card */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Last Anomaly Detected</Typography>
            <Alert severity="warning" style={{ marginTop: "10px" }}>
              {lastAnomaly}
            </Alert>
          </CardContent>
        </Card>
      </Grid>

      {/* AI Recommendation Card */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">AI Recommendation</Typography>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              {recommendation}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default InsightsPanel;
