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
  status: string;
};

type Appointment = {
  fullName: string;
  surname: string;
  idPassportNo: string;
  contactNumber: string;
  pregnancyWeeks: number;
  date: string;
  time: string;
  edd: string;
  age: number;
  g: number;
  p: number;
  babyHeight: number;
  motherWeight: number;
  motherPulse: number;
  motherBloodPressure: string;
  motherProtein: string;
  motherGlucose: string;
  motherLeucosite: string;
  motherBlood: string;
  babyHeartRate: number;
  babyPresentation: string;
  babyPosition: string;
};

export function UsersPrimaryButtons() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [rows, setRows] = useState<Appointment[]>([]);

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
      const jsonData = XLSX.utils.sheet_to_json<Appointment>(sheet, {
        raw: false, // force SSF formatting (e.g., times, dates)
        defval: "", // set default value for empty cells
      });

      uploadAppointmentsExcel(
        jsonData.map(
          ({
            fullName,
            surname,
            idPassportNo,
            contactNumber,
            pregnancyWeeks,
            date,
            time,
            edd,
            age,
            g,
            p,
            babyHeight,
            motherWeight,
            motherPulse,
            motherBloodPressure,
            motherProtein,
            motherGlucose,
            motherLeucosite,
            motherBlood,
            babyHeartRate,
            babyPresentation,
            babyPosition,
          }) => ({
            fullName,
            surname,
            idPassportNo,
            contactNumber: contactNumber.toString().padStart(10, "0"),
            pregnancyWeeks,
            date,
            time,
            edd,
            age,
            g,
            p,
            babyHeight,
            motherWeight,
            motherPulse,
            motherBloodPressure,
            motherProtein,
            motherGlucose,
            motherLeucosite,
            motherBlood,
            babyHeartRate,
            babyPresentation,
            babyPosition,
          })
        )
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
