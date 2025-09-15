import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PatientTable } from "@/components/dashboard/patient-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DuePatientTables = ({ patientsDue }: { patientsDue: any[] }) => {
  return (
    <>
      {" "}
      <Card className="col-span-1 lg:col-span-6">
        <CardHeader>
          <CardTitle>Patients Due This Month</CardTitle>
          <CardDescription>
            Showing expected deliveries this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PatientTable patients={patientsDue} />
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-6">
        <CardHeader>
          <CardTitle>Patients Due Per Month</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="august">
            <TabsList className="overflow-x-auto border-b border-black">
              {["August", "September", "October", "November", "December"].map(
                (m) => (
                  <TabsTrigger
                    key={m}
                    value={m.toLowerCase()}
                    className="text-black"
                  >
                    {m}
                  </TabsTrigger>
                )
              )}
            </TabsList>
            <TabsContent value="august">
              <PatientTable patients={patientsDue} />
            </TabsContent>
            <TabsContent value="september">
              <PatientTable
                patients={[{ id: 4, name: "Grace O.", dueDate: "2025-09-12" }]}
              />
            </TabsContent>
            <TabsContent value="october">
              <PatientTable
                patients={[{ id: 5, name: "Lara B.", dueDate: "2025-10-05" }]}
              />
            </TabsContent>
            <TabsContent value="november">
              <PatientTable patients={[]} />
            </TabsContent>
            <TabsContent value="december">
              <PatientTable patients={[]} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default DuePatientTables;
