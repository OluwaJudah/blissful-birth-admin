import AppointmentTabs from "@/components/user/settings/components/appointment-tabs";
import UsersProvider from "@/components/user/settings/appointments/[appointmentId]/context/users-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { RescheduleAppointmmentButton } from "@/components/user/settings/appointments/[appointmentId]/appointment-button";
import { UsersDialogs } from "@/components/user/settings/appointments/[appointmentId]/users-dialogs";
import { getAppointment } from "@/data/appointment";
import { Suspense } from "react";
import { calculateTrimester } from "@/utils";
import { trimesters } from "@/constants/user";

export default async function Appointments({
  params,
}: {
  params: Promise<{ appointmentId: string }>;
}) {
  const { appointmentId } = await params;
  const appointment = await getAppointment(appointmentId);
  const pregnancyWeeks = appointment?.pregnancyWeeks;
  const trimester = calculateTrimester(appointment?.pregnancyWeeks || 0);
  const trimesterStr = trimesters[trimester];

  return (
    <UsersProvider>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-none">
            <h3 className="text-lg font-medium">
              Appointment - Week {pregnancyWeeks} ({trimesterStr} Trimester)
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage all appointment details and report here.
            </p>
          </div>
          <Suspense fallback={<>Loading ...</>}>
            <RescheduleAppointmmentButton />
          </Suspense>
        </div>
        <Separator className="my-4 flex-none" />
        <ScrollArea className="faded-bottom -mx-4 flex-1 scroll-smooth px-4 md:pb-16">
          <div className="-mx-1 px-1.5 flex flex-col gap-3 lg:w-full">
            <AppointmentTabs appointmentId={appointmentId} />{" "}
          </div>
        </ScrollArea>
        <UsersDialogs
          appointmentId={appointmentId}
          appointmentData={{
            time: appointment?.time || "",
            pregnancyWeeks: appointment?.pregnancyWeeks || 0,
            date: appointment?.date || new Date(),
          }}
        />
      </div>
    </UsersProvider>
  );
}
