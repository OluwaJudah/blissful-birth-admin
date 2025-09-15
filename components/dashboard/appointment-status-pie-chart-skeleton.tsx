"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export default function AppointmentStatusPieChartSkeleton() {
  return (
    <Card className="col-span-1 lg:col-span-6">
      <CardHeader>
        <CardTitle>Appointment Status</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6">
        {/* Circle skeleton for pie chart */}
        <Skeleton className="w-40 h-40 rounded-full" />

        {/* Legend skeletons */}
        <div className="flex flex-col gap-2 w-full items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
