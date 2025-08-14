import React from "react";
import { Box, Typography } from "@mui/material";

export default function HeatmapChart() {
  const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const values = categories.map(() =>
    Array.from({ length: 6 }, () => Math.floor(Math.random() * 100))
  );

  const getColor = (value) => {
    if (value > 80) return "#6a11cb";
    if (value > 60) return "#2575fc";
    if (value > 40) return "#4ECDC4";
    if (value > 20) return "#ffd200";
    return "#ff6b6b";
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Monthly Performance Heatmap
      </Typography>
      <Box display="grid" gridTemplateColumns={`repeat(${categories.length}, 60px)`} gap={1}>
        {values.map((row, i) =>
          row.map((val, j) => (
            <Box
              key={`${i}-${j}`}
              sx={{
                height: 60,
                backgroundColor: getColor(val),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                borderRadius: 1,
              }}
            >
              {val}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
