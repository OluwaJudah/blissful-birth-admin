"use client";

import { MonthDuePatient } from "@/definitions/dashboard";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Patient {
  id: number;
  name: string;
  dueDate: string;
}

export function PatientsDueCalendar({
  patients,
}: {
  patients: MonthDuePatient[];
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Group patients by dueDate (yyyy-mm-dd)
  const patientsByDate: Record<string, Patient[]> = {};
  patients.forEach((p) => {
    const dateKey = new Date(p.dueDate).toISOString().split("T")[0];
    if (!patientsByDate[dateKey]) patientsByDate[dateKey] = [];
    patientsByDate[dateKey].push(p);
  });

  // Customize calendar tiles to show patient count
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const key = date.toISOString().split("T")[0];
      const count = patientsByDate[key]?.length || 0;
      return count > 0 ? (
        <div className="text-xs text-white bg-black rounded-full w-6 h-6 flex items-center justify-center mt-1">
          {count}
        </div>
      ) : null;
    }
    return null;
  };

  const selectedPatients = selectedDate
    ? patientsByDate[selectedDate.toISOString().split("T")[0]] || []
    : [];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Calendar
        onClickDay={setSelectedDate}
        tileContent={tileContent}
        className="border rounded-md"
      />

      {selectedDate && (
        <div className="flex-1 p-4 border rounded-md h-fit">
          <h3 className="font-semibold mb-2">
            Patients due on {selectedDate.toLocaleDateString()}
          </h3>
          {selectedPatients.length === 0 ? (
            <p>No patients due</p>
          ) : (
            <ul className="list-disc pl-5">
              {selectedPatients.map((p) => (
                <li key={p.id}>{p.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
