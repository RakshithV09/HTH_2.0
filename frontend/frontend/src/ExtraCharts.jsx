import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function ExtraCharts() {
  const barData = {
    labels: ["Marketing", "Sales", "Operations", "HR"],
    datasets: [
      {
        label: "Department Spend",
        data: [150000, 200000, 120000, 80000],
        backgroundColor: ["#6a11cb", "#ff6b6b", "#4ECDC4", "#f7971e"],
      },
    ],
  };

  const pieData = {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        label: "Product Share",
        data: [45, 35, 20],
        backgroundColor: ["#2575fc", "#ff9a9e", "#ffd200"],
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: "300px" }}>
        <Bar data={barData} />
      </div>
      <div style={{ flex: 1, minWidth: "300px" }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
}
