import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MotherInfo from "./mother-info";
import BirthCompanion from "./birth-companion";

export default async function ProfileTabs({ userId }: { userId: string }) {
  return (
    <>
      <Tabs defaultValue="mother" className="w-full">
        <TabsList className="grid w-1/2 grid-cols-4 px-2 flex justify-between mx-auto">
          <TabsTrigger value="mother">Mother's Information </TabsTrigger>
          <TabsTrigger value="birth-companion">
            Birth Companion & Baby
          </TabsTrigger>
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
        </TabsList>
        <TabsContent value="mother">
          <Card>
            <CardHeader>
              <CardTitle>Mother's Information</CardTitle>
              <CardDescription>
                View Mother's information details here according to the profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <MotherInfo userId={userId} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="birth-companion">
          <Card>
            <CardHeader>
              <CardTitle>Birth Companion's Information detais</CardTitle>
              <CardDescription>
                View Birth Companion's information details here according to the
                profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <BirthCompanion userId={userId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
