"use client";

import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function KpiCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <KpiCardSkeleton key={i} />
      ))}
    </div>
  );
}

function KpiCardSkeleton() {
  return (
    <Card className="flex items-center gap-4 p-4">
      {/* Icon placeholder */}
      <Skeleton className="w-10 h-10 rounded-xl" />

      {/* Text placeholders */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
    </Card>
  );
}
