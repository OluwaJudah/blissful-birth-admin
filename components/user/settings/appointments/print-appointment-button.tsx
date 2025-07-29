"use client";
import { IconPrinter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function PrintAppointmmentButton({ id }: { id: string }) {
  const handleDownload = async () => {
    const response = await fetch(`/api/print-appointments/${id}`);
    if (!response.ok) return alert("Failed to download PDF");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "appointment-report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button className="space-x-1" onClick={handleDownload}>
      <span>Print</span> <IconPrinter size={18} />
    </Button>
  );
}
