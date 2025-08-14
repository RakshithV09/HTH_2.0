import { Button, Box, Typography } from "@mui/material";

export default function HomePage({ onLogin }) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "#f5f5f5",
        px: 2
      }}
    >
      <Typography variant="h3" mb={3}>
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="h6" mb={4} color="text.secondary">
        Please login to access your personalized financial analytics.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={onLogin}
      >
        Login
      </Button>
    </Box>
  );
}
