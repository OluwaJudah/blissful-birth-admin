"use client";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const appointmentStatusData = [
  { status: "Pending", value: 25 },
  { status: "Confirmed", value: 45 },
  { status: "Completed", value: 30 },
];

const COLORS = ["#000", "#444", "#888"]; // Black theme colors

export function AppointmentStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={appointmentStatusData}
          dataKey="value"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {appointmentStatusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
