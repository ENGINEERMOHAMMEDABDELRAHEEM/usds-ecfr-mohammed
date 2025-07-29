import { saveAs } from "file-saver";
import jsPDF from "jspdf";

export function exportToCSV(data, filename = "data.csv") {
  const headers = "Agency,Value\n";
  const rows = Object.entries(data)
    .map(([key, value]) => `"${key}",${value}`)
    .join("\n");

  const csvContent = headers + rows;
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  saveAs(blob, filename);
}

export function exportToPDF(data, filename = "data.pdf", title = "Data Export") {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(title, 10, 10);

  let y = 20;
  Object.entries(data).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`, 10, y);
    y += 10;
  });

  doc.save(filename);
}
