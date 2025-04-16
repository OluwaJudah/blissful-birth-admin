import AppointmentTabs from "@/components/user/settings/components/appointment-tabs";

export default async function SettingsProfile({
  params,
}: {
  params: Promise<{ appointmentId: string }>;
}) {
  const { appointmentId } = await params;

  return <AppointmentTabs appointmentId={appointmentId} />;
}
