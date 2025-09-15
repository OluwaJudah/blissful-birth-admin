import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MonthDuePatient } from "@/definitions/dashboard";
import { PatientsDueCalendar } from "./patient-due-calendar";

const DuePatientTables = ({
  monthDuePatients,
}: {
  monthDuePatients: any[];
}) => {
  return (
    <>
      {" "}
      <Card className="col-span-1 lg:col-span-12">
        <CardHeader>
          <CardTitle>Patients Due This Month</CardTitle>
          <CardDescription>
            Showing expected deliveries this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <PatientTable data={monthDuePatients} /> */}
          <PatientsDueCalendar patients={monthDuePatients} />
        </CardContent>
      </Card>
    </>
  );
};

export default DuePatientTables;
