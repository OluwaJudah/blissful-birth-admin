import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BabyReportForm } from "./baby-report";
import { MotherReportForm } from "./mothers-report";
import {
  defaultValueBabyReportForm,
  defaultValueMotherReportForm,
} from "@/constants/appointment";

export default async function AppointmentTabs({
  appointmentId,
}: {
  appointmentId: string;
}) {
  let motherReport = defaultValueMotherReportForm;
  let babyReport = defaultValueBabyReportForm;

  return (
    <>
      <Tabs defaultValue="mother" className="w-full">
        <TabsList className="grid w-1/2 grid-cols-2 mx-auto">
          <TabsTrigger value="mother">Mother's Report </TabsTrigger>
          <TabsTrigger value="baby">Baby's Report</TabsTrigger>
        </TabsList>
        <TabsContent value="mother">
          <Card>
            <CardHeader>
              <CardTitle>Manage Mother's Report Here</CardTitle>
              <CardDescription>
                Make changes to Mother's Appointment Report here. Click "Submit"
                when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <MotherReportForm
                appointmentId={appointmentId}
                motherReport={motherReport}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="baby">
          <Card>
            <CardHeader>
              <CardTitle>Manage Baby's Report Here</CardTitle>
              <CardDescription>
                Make changes to Baby's Appointment Report here. Click "Submit"
                when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <BabyReportForm
                appointmentId={appointmentId}
                babyReport={babyReport}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
