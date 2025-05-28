"use client";
import { IconUserPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { uploadAppointmentsExcel } from "@/actions/appointment";

type Person = {
  name: string;
  weeks: number;
  dueDate: string;
  timeSlot: string;
  number: string;
};

export function UsersPrimaryButtons() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [rows, setRows] = useState<Person[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt: ProgressEvent<FileReader>) => {
      const data = evt.target?.result;
      if (typeof data !== "string" && !(data instanceof ArrayBuffer)) return;

      const workbook = XLSX.read(data, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // Auto-parsed to objects assuming first row contains headers
      const jsonData = XLSX.utils.sheet_to_json<Person>(sheet, {
        raw: false, // force SSF formatting (e.g., times, dates)
        defval: "", // set default value for empty cells
      });

      uploadAppointmentsExcel(
        jsonData.map(({ name, weeks, dueDate, timeSlot, number }) => ({
          name,
          weeks,
          dueDate,
          timeSlot,
          number,
        }))
      );
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => fileRef.current?.click()}>
        <span>Upload Clients</span> <IconUserPlus size={18} />
      </Button>
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        hidden
        ref={fileRef}
        onChange={handleFileUpload}
      />
    </div>
  );
}
