import UsersProvider from "@/components/user/[id]/scans/context/users-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UsersDialogs } from "@/components/user/[id]/scans/users-dialogs";
import { Suspense } from "react";
import { CreateAppointmmentButton } from "@/components/user/[id]/scans/create-appointment-button";
import { getScans } from "@/data/scan";
import ScanEntry from "@/components/user/[id]/scans/scan";

export const revalidate = 0;

export default async function Scans({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scans = (await getScans(id)) || [];

  return (
    <UsersProvider>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-none">
            <h3 className="text-lg font-medium">Scans</h3>
          </div>
          <div className="flex gap-1">
            <CreateAppointmmentButton />
          </div>
        </div>
        <Separator className="my-4 flex-none" />
        <ScrollArea className="faded-bottom -mx-4 flex-1 scroll-smooth px-4 md:pb-16">
          <Suspense fallback={<>Loading...</>}>
            <div className="-mx-1 px-1.5 flex flex-col gap-2 lg:max-w-xl">
              {scans.map((scan) => (
                <ScanEntry
                  key={scan.id}
                  scan={{ ...scan, date: new Date(scan.date) }}
                />
              ))}
            </div>
          </Suspense>
        </ScrollArea>
        <UsersDialogs userId={id} />
      </div>
    </UsersProvider>
  );
}
