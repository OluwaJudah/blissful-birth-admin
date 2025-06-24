import UsersProvider from "@/components/user/settings/appointments/context/users-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import AppointmentEntry from "@/components/user/settings/appointments/AppointmentEntry";
import { getMotherAppointments } from "@/data/appointment";
import { UsersDialogs } from "@/components/user/settings/appointments/users-dialogs";
import { Suspense } from "react";
import { AppointmmentPrimaryButton } from "@/components/user/settings/appointments/appointment-button";
import { PATIENT_ONBOARDED } from "@/constants/appointment";
import { getMotherDetails } from "@/data/mother-info";

export const revalidate = 0;

export default async function SettingsAccount({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appointments = await getMotherAppointments(id);
  const motherInfo = await getMotherDetails(id);

  return (
    <UsersProvider>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-none">
            <h3 className="text-lg font-medium">Appoinments</h3>
            <p className="text-sm text-muted-foreground">
              Update your account settings. Set your preferred language and
              timezone.
            </p>
          </div>
          {motherInfo && motherInfo.status !== PATIENT_ONBOARDED && (
            <AppointmmentPrimaryButton />
          )}

        </div>
        <Separator className="my-4 flex-none" />
        <ScrollArea className="faded-bottom -mx-4 flex-1 scroll-smooth px-4 md:pb-16">
          <Suspense fallback={<>Loading...</>}>
            <div className="-mx-1 px-1.5 flex flex-col gap-3 lg:max-w-xl">
              {appointments.map(
                ({ _id, date, time, status, pregnancyWeeks, type }) => (
                  <AppointmentEntry
                    key={_id.toString()}
                    id={_id.toString()}
                    date={date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                    time={time}
                    status={status}
                    pregnancyWeeks={pregnancyWeeks}
                    userId={id}
                    type={type}
                  />
                )
              )}
            </div>
          </Suspense>
        </ScrollArea>
        <UsersDialogs userId={id} />
      </div>
    </UsersProvider>
  );
}
