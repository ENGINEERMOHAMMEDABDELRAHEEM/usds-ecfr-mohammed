import React from "react";

function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      style={{
        marginBottom: "1rem",
        marginLeft: "1rem",
        padding: "0.5rem 1rem",
        borderRadius: "5px",
        backgroundColor: "#6c757d",
        color: "#fff",
        border: "none",
        cursor: "pointer",
      }}
    >
      🖨️ Print Report
    </button>
  );
}

export default PrintButton;
