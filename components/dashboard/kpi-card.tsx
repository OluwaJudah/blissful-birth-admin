"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function KpiCard({ title, value, icon }: KpiCardProps) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="p-3 rounded-xl bg-black flex items-center justify-center text-white">
        {icon}
      </div>
      <div>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardContent className="text-xl font-bold p-0">{value}</CardContent>
      </div>
    </Card>
  );
}
