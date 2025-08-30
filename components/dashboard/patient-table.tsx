"use client";

interface Patient {
  id: number;
  name: string;
  dueDate: string;
}

export function PatientTable({ patients }: { patients: Patient[] }) {
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
          {patients.map((p) => (
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
