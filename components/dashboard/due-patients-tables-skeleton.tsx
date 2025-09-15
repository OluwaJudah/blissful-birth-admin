"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export default function DuePatientTablesSkeleton() {
  return (
    <Card className="col-span-1 lg:col-span-12">
      <CardHeader>
        <CardTitle>Patients Due This Month</CardTitle>
        <CardDescription>
          Showing expected deliveries this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Calendar skeleton */}
          <div className="w-1/2 grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, i) => (
              <Skeleton key={i} className="w-10 h-10" />
            ))}
          </div>

          {/* Patients list skeleton */}
          <div className="flex-1 p-4 border rounded-md h-fit">
            <Skeleton className="h-5 w-2/3 mb-4" />
            <ul className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-2/5" />
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
