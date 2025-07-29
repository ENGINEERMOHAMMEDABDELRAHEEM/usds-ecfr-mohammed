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
} from "chart.js";
import { exportToCSV, exportToPDF } from "../utils/exportUtils";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

function WordCountChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Words",
        data: values,
        backgroundColor: "rgba(100, 100, 255, 0.5)",
        borderColor: "rgba(100, 100, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels,
    datasets: [
      {
        label: "Words",
        data: values,
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "auto", marginBottom: "3rem" }}>
      <h2>Word Count Per Agency</h2>

      <h4>Word Count Chart (Bar)</h4>
      <div style={{ height: "400px" }}>
        <Bar data={barChartData} options={commonOptions} />
      </div>

      <h4 style={{ marginTop: "2rem" }}>Word Count Chart (Pie)</h4>
      <div style={{ height: "400px" }}>
        <Pie data={pieChartData} options={commonOptions} />
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button onClick={() => exportToCSV(data, "word_count.csv")}>
          📥 Export as CSV
        </button>
        <button onClick={() => exportToPDF(data, "word_count.pdf", "Word Count Data")}>
          📄 Export as PDF
        </button>
      </div>
    </div>
  );
}

export default WordCountChart;
