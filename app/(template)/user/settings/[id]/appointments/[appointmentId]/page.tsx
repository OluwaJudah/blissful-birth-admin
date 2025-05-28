import AppointmentTabs from "@/components/user/settings/components/appointment-tabs";
import UsersProvider from "@/components/user/settings/appointments/[appointmentId]/context/users-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AppointmmentPrimaryButton } from "@/components/user/settings/appointments/[appointmentId]/appointment-button";
import { UsersDialogs } from "@/components/user/settings/appointments/[appointmentId]/users-dialogs";
import { getAppointment } from "@/data/appointment";
import { COMPLETED_APPOINTMENT } from "@/constants/appointment";
import FirstAppointmentForm from "@/components/user/settings/components/first-appointment-form";
import { getMotherDetails } from "@/data/mother-info";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Appointments({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; appointmentId: string }>;
  searchParams: SearchParams;
}) {
  const { id, appointmentId } = await params;
  const appointment = await getAppointment(appointmentId);
  const mother = await getMotherDetails(id);

  let eddStr = "";
  if (mother && mother.edd) {
    const date = new Date(mother.edd);
    eddStr = date.toISOString().split("T")[0];
  }

  const query = await searchParams;
  const first = query.first || "";
  const isCompleted =
    appointment && appointment.status === COMPLETED_APPOINTMENT ? true : false;

  let headerLabel = first ? "First Appointment" : "Appoinment Details";
  let description = "";

  if (first) {
    headerLabel = "First Appointment";
    description = "Manage first appointment details";
  } else {
    headerLabel = "Appoinment Details";
    description = "Manage appointment details and report here.";
  }

  return (
    <UsersProvider>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-none">
            <h3 className="text-lg font-medium">{headerLabel}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {!isCompleted && <AppointmmentPrimaryButton />}
        </div>
        <Separator className="my-4 flex-none" />
        <ScrollArea className="faded-bottom -mx-4 flex-1 scroll-smooth px-4 md:pb-16">
          <div className="-mx-1 px-1.5 flex flex-col gap-3 lg:w-full">
            {first ? (
              <FirstAppointmentForm edd={eddStr} userId={id} />
            ) : (
              <AppointmentTabs appointmentId={appointmentId} />
            )}
          </div>
        </ScrollArea>
        <UsersDialogs appointmentId={appointmentId} />
      </div>
    </UsersProvider>
  );
}
