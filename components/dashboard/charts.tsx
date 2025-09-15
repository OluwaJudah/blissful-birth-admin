import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentStatusChart } from "./appointment-status-chart";
import { MonthlyIntakeChart } from "./monthly-intake";
import { Suspense } from "react";
import { MonthlyIntakeChartSkeleton } from "./monthly-intake-chart-skeleton";
import {
  getAppointmentStatusData,
  getMonthlyIntakeData,
} from "@/data/dashboard";

export default async function Charts() {
  const monthlyIntakeData = await getMonthlyIntakeData();
  const appointmentStatusData = await getAppointmentStatusData();

  return (
    <>
      {" "}
      <Card className="col-span-1 lg:col-span-6">
        <CardHeader>
          <CardTitle>Monthly Intake of New Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<MonthlyIntakeChartSkeleton />}>
            <MonthlyIntakeChart data={monthlyIntakeData} />
          </Suspense>
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-6">
        <CardHeader>
          <CardTitle>Appointment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <AppointmentStatusChart data={appointmentStatusData} />
        </CardContent>
      </Card>
    </>
  );
}
