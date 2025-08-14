import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function RadarChart() {
  const data = {
    labels: ["Marketing", "Sales", "Operations", "HR", "R&D", "IT"],
    datasets: [
      {
        label: "Department Efficiency",
        data: [80, 90, 70, 60, 85, 75],
        backgroundColor: "rgba(106,17,203,0.2)",
        borderColor: "#6a11cb",
        borderWidth: 2,
        pointBackgroundColor: "#6a11cb",
      },
      {
        label: "Last Quarter",
        data: [70, 85, 65, 55, 75, 70],
        backgroundColor: "rgba(255,107,107,0.2)",
        borderColor: "#ff6b6b",
        borderWidth: 2,
        pointBackgroundColor: "#ff6b6b",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: { color: "#ccc" },
        grid: { color: "#eee" },
        pointLabels: { color: "#333" },
      },
    },
  };

  return <Radar data={data} options={options} />;
}
