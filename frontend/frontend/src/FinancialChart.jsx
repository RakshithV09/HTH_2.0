import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function FinancialChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [500000, 600000, 550000, 650000, 700000, 750000],
        borderColor: "#6a11cb",
        backgroundColor: "rgba(106,17,203,0.3)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Expenses",
        data: [300000, 350000, 320000, 370000, 390000, 400000],
        borderColor: "#ff6b6b",
        backgroundColor: "rgba(255,107,107,0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#333" } },
    },
    scales: {
      x: { ticks: { color: "#333" } },
      y: { ticks: { color: "#333" } },
    },
  };

  return <Line data={data} options={options} />;
}
