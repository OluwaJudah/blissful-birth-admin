import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentStatusChart } from "./appointment-status-chart";
import { getAppointmentStatusData } from "@/data/dashboard";

export default async function AppointmentStatusPieChart() {
  const appointmentStatusData = await getAppointmentStatusData();

  return (
    <>
      {" "}
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
