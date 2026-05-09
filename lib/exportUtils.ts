import jsPDF from 'jspdf';

export const exportAsTXT = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportAsCSV = (content: string, filename: string) => {
  const csvContent = `"Result"\n"${content.replace(/"/g, '""')}"`;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportAsPDF = async (content: string, filename: string) => {
  const { default: jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  
  const lines = doc.splitTextToSize(content, 170);
  doc.setFont('helvetica');
  doc.setFontSize(10);
  
  let y = 20;
  for (let i = 0; i < lines.length; i++) {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(lines[i], 20, y);
    y += 7;
  }
  
  doc.save(`${filename}.pdf`);
};