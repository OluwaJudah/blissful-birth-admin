"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Jan", total: 1000 },
  { name: "Feb", total: 2000 },
  { name: "Mar", total: 3000 },
  { name: "Apr", total: 4000 },
  { name: "May", total: 5000 },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#000" tickLine={false} axisLine={false} />
        <YAxis stroke="#000" tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
