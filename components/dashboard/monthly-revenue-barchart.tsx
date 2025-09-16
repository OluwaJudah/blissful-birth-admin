import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMonthlyRevenueData } from "@/data/dashboard";
import { MonthlyRevenueChart } from "./monthly-revenue";

export default async function MonthlyRevenueBarChart() {
  const monthlyIntakeData = await getMonthlyRevenueData();

  return (
    <>
      {" "}
      <Card className="col-span-1 lg:col-span-6">
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyRevenueChart data={monthlyIntakeData} />
        </CardContent>
      </Card>
    </>
  );
}
