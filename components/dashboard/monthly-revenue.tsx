"use client";

import { MonthlyRevenueData } from "@/definitions/dashboard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function MonthlyRevenueChart({ data }: { data: MonthlyRevenueData[] }) {
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
        <Bar dataKey="revenue" fill="#000" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
