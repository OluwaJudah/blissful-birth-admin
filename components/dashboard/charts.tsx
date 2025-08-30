"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BarChartData {
  month: string;
  intake: number;
}

interface PieChartData {
  status: string;
  value: number;
}

const COLORS = ["#000", "#111", "#333"];

export function MonthlyIntakeChart({ data }: { data: BarChartData[] }) {
  return (
    <Card className="col-span-1 lg:col-span-6">
      <CardHeader>
        <CardTitle>Monthly Intake of New Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#000" />
            <YAxis stroke="#000" />
            <Tooltip />
            <Bar dataKey="intake" fill="#000" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function AppointmentStatusPieChart({ data }: { data: PieChartData[] }) {
  return (
    <Card className="col-span-1 lg:col-span-6">
      <CardHeader>
        <CardTitle>Appointment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
