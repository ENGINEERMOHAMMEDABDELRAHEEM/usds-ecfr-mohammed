import React, { useEffect, useState } from "react";
import WordCountChart from "./components/WordCountChart";
import RegulationDensityChart from "./components/RegulationDensityChart";

function App() {
  const [wordCount, setWordCount] = useState({});
  const [customMetric, setCustomMetric] = useState({});

  const backendURL = "https://usds-ecfr-backend.onrender.com"; // Replace with your actual backend URL

  useEffect(() => {
    fetch(`${backendURL}/api/word_count`)
      .then((res) => res.json())
      .then(setWordCount);

    fetch(`${backendURL}/api/custom_metric`)
      .then((res) => res.json())
      .then(setCustomMetric);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>USDS eCFR Insights</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
        📊 Total Agencies Analyzed: {Object.keys(wordCount).length}
      </p>
      <h3 style={{ color: "#2E8B57", marginBottom: "2rem" }}>
        Submitted by Engineer Mohammed Abdelraheem
      </h3>

      <h2>Word Count Per Agency</h2>
      <WordCountChart data={wordCount} />

      <h2 style={{ marginTop: "3rem" }}>
        Regulation Density (words per section)
      </h2>
      <RegulationDensityChart data={customMetric} />

      {/* ✅ DOWNLOAD SECTION */}
      <div style={{ marginTop: "3rem" }}>
        <a
          href={`${backendURL}/api/word_count`}
          download="word_count.json"
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          📥 Download Word Count Data (JSON)
        </a>

        <a
          href={`${backendURL}/api/custom_metric`}
          download="regulation_density.json"
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#28a745",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          📥 Download Regulation Density (JSON)
        </a>
      </div>
    </div>
  );
}

export default App;
