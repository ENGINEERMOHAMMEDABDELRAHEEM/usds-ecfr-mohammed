import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

function RegulationDensityChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Words per Section",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels,
    datasets: [
      {
        label: "Words per Section",
        data: values,
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff9f40",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Regulation Density by Agency",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Agency",
        },
      },
      y: {
        title: {
          display: true,
          text: "Words per Section",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h4 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Regulation Density Chart (Bar)
      </h4>
      <Bar data={barChartData} options={options} />

      <h4 style={{ textAlign: "center", margin: "2rem 0 1rem" }}>
        Regulation Density Chart (Pie)
      </h4>
      <Pie data={pieChartData} />
    </div>
  );
}

export default RegulationDensityChart;
