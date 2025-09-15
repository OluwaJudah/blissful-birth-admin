import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export default function MonthlyIntakeBarChartSkeleton() {
  return (
    <Card className="col-span-1 lg:col-span-6">
      <CardHeader>
        <CardTitle>Monthly Intake of New Patients</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex items-end gap-2">
        {/* Fake bars for skeleton */}
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`w-6 rounded-sm`}
            style={{ height: `${Math.floor(Math.random() * 200) + 40}px` }}
          />
        ))}
      </CardContent>
    </Card>
  );
}
