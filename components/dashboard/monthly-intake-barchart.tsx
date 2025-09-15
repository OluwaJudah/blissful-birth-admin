import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyIntakeChart } from "./monthly-intake";
import {
  getMonthlyIntakeData,
} from "@/data/dashboard";

export default async function MonthlyIntakeBarChart() {
  const monthlyIntakeData = await getMonthlyIntakeData();

  return (
    <>
      {" "}
      <Card className="col-span-1 lg:col-span-6">
        <CardHeader>
          <CardTitle>Monthly Intake of New Patients</CardTitle>
        </CardHeader>
        <CardContent>
            <MonthlyIntakeChart data={monthlyIntakeData} />
        </CardContent>
      </Card>
    </>
  );
}
