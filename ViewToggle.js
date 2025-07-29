import React from "react";

function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <button
        onClick={() => setViewMode("charts")}
        disabled={viewMode === "charts"}
        style={{
          padding: "0.5rem 1rem",
          marginRight: "1rem",
          backgroundColor: viewMode === "charts" ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        📊 Chart View
      </button>
      <button
        onClick={() => setViewMode("tables")}
        disabled={viewMode === "tables"}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: viewMode === "tables" ? "#ccc" : "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        📋 Table View
      </button>
    </div>
  );
}

export default ViewToggle;
