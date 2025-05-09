import AppointmentTabs from "@/components/user/settings/components/appointment-tabs";
import UsersProvider from "@/components/user/settings/appointments/[appointmentId]/context/users-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AppointmmentPrimaryButton } from "@/components/user/settings/appointments/[appointmentId]/appointment-button";
import { UsersDialogs } from "@/components/user/settings/appointments/[appointmentId]/users-dialogs";

export default async function SettingsProfile({
  params,
}: {
  params: Promise<{ appointmentId: string }>;
}) {
  const { appointmentId } = await params;

  return (
    <UsersProvider>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-none">
            <h3 className="text-lg font-medium">Appoinment Details</h3>
            <p className="text-sm text-muted-foreground">
              Manage all appointment details and report here.
            </p>
          </div>
          <AppointmmentPrimaryButton />
        </div>
        <Separator className="my-4 flex-none" />
        <ScrollArea className="faded-bottom -mx-4 flex-1 scroll-smooth px-4 md:pb-16">
          <div className="-mx-1 px-1.5 flex flex-col gap-3 lg:w-full">
            <AppointmentTabs appointmentId={appointmentId} />{" "}
          </div>
        </ScrollArea>
        <UsersDialogs appointmentId={appointmentId} />
      </div>
    </UsersProvider>
  );
}
