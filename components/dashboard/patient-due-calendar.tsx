"use client";

import { MonthDuePatient } from "@/definitions/dashboard";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Calendar, { OnArgs } from "react-calendar";
import "react-calendar/dist/Calendar.css";

export function PatientsDueCalendar({
  patients,
}: {
  patients: MonthDuePatient[];
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();
  const searchParams = useSearchParams();

  // Group patients by date
  const patientsByDate: Record<string, MonthDuePatient[]> = {};
  patients.forEach((p) => {
    const key = new Date(p.dueDate).toISOString().split("T")[0];
    if (!patientsByDate[key]) patientsByDate[key] = [];
    patientsByDate[key].push(p);
  });

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

  const selectedPatients =
    patientsByDate[selectedDate.toISOString().split("T")[0]] || [];

  const handleMonthChange = ({ activeStartDate }: OnArgs) => {
    if (!activeStartDate) return;
    const year = activeStartDate.getFullYear();
    const month = activeStartDate.getMonth();
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", String(year));
    params.set("month", String(month));
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Calendar
        onClickDay={setSelectedDate}
        onActiveStartDateChange={handleMonthChange}
        tileContent={tileContent}
        className="border rounded-md"
      />

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
    </div>
  );
}
