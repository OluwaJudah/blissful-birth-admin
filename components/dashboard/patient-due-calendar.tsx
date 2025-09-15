"use client";

import { MonthDuePatient } from "@/definitions/dashboard";
import { useState, useTransition } from "react";
import Calendar from "react-calendar";
import type { OnArgs } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarSkeleton, PatientsListSkeleton } from "./calendar-skeleton";

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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const patientsByDate: Record<string, Patient[]> = {};
  patients.forEach((p) => {
    const key = new Date(p.dueDate).toISOString().split("T")[0];
    if (!patientsByDate[key]) patientsByDate[key] = [];
    patientsByDate[key].push(p);
  });

  const selectedPatients = selectedDate
    ? patientsByDate[selectedDate.toISOString().split("T")[0]] || []
    : [];

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

  const handleMonthChange = ({ activeStartDate }: OnArgs) => {
    if (!activeStartDate) return;
    const year = activeStartDate.getFullYear();
    const month = activeStartDate.getMonth();

    const params = new URLSearchParams(searchParams.toString());
    params.set("year", String(year));
    params.set("month", String(month));

    startTransition(() => {
      router.push(`/dashboard?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {isPending ? (
        <CalendarSkeleton />
      ) : (
        <Calendar
          onClickDay={setSelectedDate}
          onActiveStartDateChange={handleMonthChange}
          tileContent={tileContent}
          className="border rounded-md w-full md:w-1/2"
        />
      )}

      {isPending ? (
        <PatientsListSkeleton />
      ) : (
        <div className="flex-1 p-4 border rounded-md h-fit">
          <h3 className="font-semibold mb-2">
            Patients due on {selectedDate?.toLocaleDateString()}
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
