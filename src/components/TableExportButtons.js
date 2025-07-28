import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

function TableExportButtons({ data, filename }) {
  const getTimestamp = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}_${hh}-${min}`;
  };

  const exportCSV = () => {
    const csv = Papa.unparse(
      Object.entries(data).map(([agency, value]) => ({
        Agency: agency,
        Value: value,
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const timestamp = getTimestamp();
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${filename}_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();
    const tableData = Object.entries(data).map(([agency, value]) => [
      agency,
      value,
    ]);

    // Title and metadata
    doc.setFontSize(18);
    doc.text("USDS eCFR Insights Report", 14, 20);
    doc.setFontSize(12);
    doc.text("Prepared by Engineer Mohammed Abdelraheem", 14, 28);
    doc.text(`Exported on: ${timestamp}`, 14, 36);

    // Table
    autoTable(doc, {
      startY: 45,
      head: [["Agency", "Value"]],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [23, 162, 184] },
    });

    // Create blob
    const blob = doc.output("blob");
    const blobUrl = URL.createObjectURL(blob);

    // Open in new tab
    window.open(blobUrl);

    // Trigger download
    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = `${filename}_${getTimestamp()}.pdf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
      <button
        onClick={exportCSV}
        style={{
          marginRight: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#17a2b8",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🟦 Export CSV
      </button>
      <button
        onClick={exportPDF}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🟥 Export PDF
      </button>
    </div>
  );
}

export default TableExportButtons;
