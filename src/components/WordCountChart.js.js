import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

function WordCountChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Words",
        data: values,
        backgroundColor: "rgba(138, 43, 226, 0.5)",
        borderColor: "rgba(138, 43, 226, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Word Count by Agency",
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
          text: "Word Count",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default WordCountChart;

