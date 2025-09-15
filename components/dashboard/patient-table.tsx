"use client";

import { MonthDuePatient } from "@/definitions/dashboard";

export function PatientTable({ data }: { data: MonthDuePatient[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-gray-400">
            <th className="pb-2">Name</th>
            <th className="pb-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id} className="border-b border-gray-400">
              <td className="py-2">{p.name}</td>
              <td className="py-2 text-muted-foreground">{p.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
