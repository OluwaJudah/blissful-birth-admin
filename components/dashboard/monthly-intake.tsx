"use client";

import { MonthlyData } from "@/definitions/dashboard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function MonthlyIntakeChart({ data }: { data: MonthlyData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
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
