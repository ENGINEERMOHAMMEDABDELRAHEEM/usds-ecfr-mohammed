import React, { useEffect, useState } from "react";
import WordCountChart from "./components/WordCountChart";
import RegulationDensityChart from "./components/RegulationDensityChart";
import DataTable from "./components/DataTable";
import TableExportButtons from "./components/TableExportButtons";
import SmartInsights from "./components/SmartInsights";
import DarkModeToggle from "./components/DarkModeToggle";
import PrintButton from "./components/PrintButton";
import ViewToggle from "./components/ViewToggle";
import { useTheme } from "./ThemeContext";
import usdsLogo from "./assets/usds-logo.png";

function App() {
  const [wordCount, setWordCount] = useState({});
  const [customMetric, setCustomMetric] = useState({});
  const [viewMode, setViewMode] = useState("charts");

  const { darkMode } = useTheme();
  const backendURL = "https://usds-ecfr-mohammed.onrender.com";    

  useEffect(() => {
    fetch(`${backendURL}/api/word_count`)
      .then((res) => res.json())
      .then(setWordCount);

    fetch(`${backendURL}/api/custom_metric`)
      .then((res) => res.json())
      .then(setCustomMetric);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      {/* Top buttons row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <DarkModeToggle />
          <PrintButton />
          <div style={{ marginTop: "1rem" }}>
            <a href="https://usds.gov" target="_blank" rel="noopener noreferrer">
              <img
                src={usdsLogo}
                alt="USDS Logo"
                style={{
                  width: "350px",
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Title remains centered */}
      <div style={{ textAlign: "center", marginTop: "-4rem" }}>
        <h1 tabIndex="0">USDS eCFR Insights</h1>
        <p style={{ fontSize: "1.1rem" }}>
          📊 Total Agencies Analyzed: {Object.keys(wordCount).length}
        </p>
        <h3 style={{ color: "#2E8B57" }}>
          Submitted by Engineer Mohammed Abdelraheem
        </h3>
      </div>

      <SmartInsights wordCount={wordCount} customMetric={customMetric} />
      <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />

      {viewMode === "charts" ? (
        <>
          <h2>Word Count Per Agency</h2>
          <WordCountChart data={wordCount} />
          <TableExportButtons data={wordCount} filename="word_count" />

          <h2 style={{ marginTop: "3rem" }}>
            Regulation Density (words per section)
          </h2>
          <RegulationDensityChart data={customMetric} />
          <TableExportButtons data={customMetric} filename="regulation_density" />
        </>
      ) : (
        <>
          <h2>📋 Word Count Table</h2>
          <DataTable data={wordCount} title="word_count" />
          <TableExportButtons data={wordCount} filename="word_count" />

          <h2 style={{ marginTop: "3rem" }}>📋 Regulation Density Table</h2>
          <DataTable data={customMetric} title="regulation_density" />
          <TableExportButtons data={customMetric} filename="regulation_density" />
        </>
      )}

      <div style={{ marginTop: "3rem" }}>
        <a
          href={`${backendURL}/api/word_count`}
          download="word_count.json"
          className="download-btn"
        >
          📥 Download Word Count Data (JSON)
        </a>

        <a
          href={`${backendURL}/api/custom_metric`}
          download="regulation_density.json"
          className="download-btn"
        >
          📥 Download Regulation Density (JSON)
        </a>
      </div>
    </div>
  );
}

export default App;
// Trigger redeploy