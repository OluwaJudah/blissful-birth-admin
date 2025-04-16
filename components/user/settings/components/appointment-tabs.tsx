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
import { getBabyReport, getMotherReport } from "@/data/appointment";
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
  const data = await getMotherReport(
    appointmentId,
    "_id motherWeight motherUrine motherPalpation motherBloodPressure motherFh motherNote"
  );
  if (data) motherReport = { ...data, _id: data._id.toString() };

  let babyReport = defaultValueBabyReportForm;
  const babyData = await getBabyReport(
    appointmentId,
    "_id babyWeight babyHeight babyHeartRate babyPosition babyNote"
  );
  if (babyData) babyReport = { ...babyData, _id: babyData._id.toString() };

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
