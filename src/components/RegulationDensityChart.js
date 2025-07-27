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
import { exportToCSV, exportToPDF } from "../utils/exportUtils";

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
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
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
    <div style={{ width: "100%", maxWidth: "900px", margin: "auto", marginBottom: "3rem" }}>
      <h2>Regulation Density Per Agency</h2>

      <h4>Regulation Density Chart (Bar)</h4>
      <div style={{ height: "400px" }}>
        <Bar data={barChartData} options={options} />
      </div>

      <h4 style={{ marginTop: "2rem" }}>Regulation Density Chart (Pie)</h4>
      <div style={{ height: "400px" }}>
        <Pie data={pieChartData} options={options} />
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button onClick={() => exportToCSV(data, "regulation_density.csv")}>
          📥 Export as CSV
        </button>
        <button onClick={() => exportToPDF(data, "regulation_density.pdf", "Regulation Density Data")}>
          📄 Export as PDF
        </button>
      </div>
    </div>
  );
}

export default RegulationDensityChart;
