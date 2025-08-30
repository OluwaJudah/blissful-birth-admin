"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientsTable } from "./patients-table";

interface MonthlyTabsProps {
  monthsData: {
    [key: string]: { id: number; name: string; dueDate: string }[];
  };
}

export function MonthlyTabs({ monthsData }: MonthlyTabsProps) {
  const monthKeys = Object.keys(monthsData);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Patients Due Per Month</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={monthKeys[0].toLowerCase()}>
          <TabsList className="overflow-x-auto border-b border-black">
            {monthKeys.map((month) => (
              <TabsTrigger key={month} value={month.toLowerCase()}>
                {month}
              </TabsTrigger>
            ))}
          </TabsList>

          {monthKeys.map((month) => (
            <TabsContent key={month} value={month.toLowerCase()}>
              <PatientsTable patients={monthsData[month]} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
