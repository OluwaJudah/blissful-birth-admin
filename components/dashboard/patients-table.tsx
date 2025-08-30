"use client";

interface Patient {
  id: number;
  name: string;
  dueDate: string;
}

export function PatientsTable({ patients }: { patients: Patient[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-black">
        <thead>
          <tr className="text-left border-b border-black">
            <th className="pb-2">Name</th>
            <th className="pb-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-b border-black">
              <td className="py-2">{p.name}</td>
              <td className="py-2 text-muted-foreground">{p.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
