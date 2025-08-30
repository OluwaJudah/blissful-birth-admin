"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const monthlyIntakeData = [
  { month: "Jan", intake: 24 },
  { month: "Feb", intake: 30 },
  { month: "Mar", intake: 45 },
  { month: "Apr", intake: 50 },
  { month: "May", intake: 38 },
  { month: "Jun", intake: 60 },
  { month: "Jul", intake: 42 },
  { month: "Aug", intake: 55 },
  { month: "Sep", intake: 48 },
  { month: "Oct", intake: 65 },
  { month: "Nov", intake: 40 },
  { month: "Dec", intake: 70 },
];

export function MonthlyIntakeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyIntakeData}>
        <XAxis
          dataKey="month"
          stroke="#000"
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="#000" tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="intake" fill="#000" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
