"use client";

import { Skeleton } from "@/components/ui/skeleton"; // or your UI framework
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

export function MonthlyIntakeChartSkeleton() {
  // Render 12 skeleton bars for each month
  const skeletonData = Array.from({ length: 12 }, (_, i) => ({
    month: "",
    intake: 0,
  }));

  return (
    <div className="w-full h-80 relative">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={skeletonData}>
          <XAxis dataKey="month" tick={false} axisLine={false} />
          <YAxis tick={false} axisLine={false} />
          <Bar dataKey="intake" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      {/* Optional overlay skeleton for shimmer effect */}
      <div className="absolute inset-0 flex items-center justify-around gap-2">
        {Array.from({ length: 12 }).map((_, idx) => (
          <Skeleton key={idx} className="h-40 w-4" />
        ))}
      </div>
    </div>
  );
}
