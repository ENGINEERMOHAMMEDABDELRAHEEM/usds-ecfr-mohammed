import React from "react";

function SmartInsights({ wordCount, customMetric }) {
  const topWordAgency = Object.entries(wordCount).sort((a, b) => b[1] - a[1])[0];
  const topDensityAgency = Object.entries(customMetric).sort((a, b) => b[1] - a[1])[0];

  return (
    <div style={{ marginTop: "2rem", padding: "1rem", background: "#f8f9fa", borderRadius: "8px" }}>
      <h3>📌 Smart Insights</h3>
      {topWordAgency && (
        <p>
          🏆 <strong>{topWordAgency[0]}</strong> has the highest total word count:{" "}
          <strong>{topWordAgency[1].toLocaleString()}</strong> words.
        </p>
      )}
      {topDensityAgency && (
        <p>
          📈 <strong>{topDensityAgency[0]}</strong> has the highest regulation density:{" "}
          <strong>{topDensityAgency[1].toFixed(2)}</strong> words per section.
        </p>
      )}
    </div>
  );
}

export default SmartInsights;
