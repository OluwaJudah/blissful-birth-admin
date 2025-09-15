import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentStatusChart } from "./appointment-status-chart";
import { MonthlyIntakeChart } from "./monthly-intake";
import { MonthlyData } from "@/definitions/dashboard";
import { Suspense } from "react";
import { MonthlyIntakeChartSkeleton } from "./monthly-intake-chart-skeleton";

export default function Charts({ data }: { data: MonthlyData[] }) {
  return (
    <>
      {" "}
      <Card className="col-span-1 lg:col-span-6">
        <CardHeader>
          <CardTitle>Monthly Intake of New Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<MonthlyIntakeChartSkeleton />}>
            <MonthlyIntakeChart data={data} />
          </Suspense>
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-6">
        <CardHeader>
          <CardTitle>Appointment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <AppointmentStatusChart />
        </CardContent>
      </Card>
    </>
  );
}
