import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

function RegulationDensityChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const barChartData = {
    labels,
    datasets: [
      {
        label: "words per section",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const pieChartData = {
    labels,
    datasets: [
      {
        label: "words per section",
        data: values,
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
      },
    ],
  };

  return (
    <div>
      <h4>Regulation Density Chart (Bar)</h4>
      <Bar data={barChartData} />
      <h4 style={{ marginTop: "2rem" }}>Regulation Density Chart (Pie)</h4>
      <Pie data={pieChartData} />
    </div>
  );
}

export default RegulationDensityChart;
