// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "rgba(25, 118, 210, 1)" },
    secondary: { main: "#9c27b0" },
    background: { default: "#f4f6f8" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
});

export default theme;
