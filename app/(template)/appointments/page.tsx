import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { getAppointmentsForFilter } from "@/data/appointment";
import AppointmentMain from "@/components/appointments/components/appointment-main";
export const revalidate = 0;

export default async function AppointmentsPage() {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const dateStr = today.toISOString().split("T")[0];
  today.setDate(today.getDate() + 8);
  const thirtyDayStr = today.toISOString().split("T")[0];
  const appointments = await getAppointmentsForFilter(dateStr, thirtyDayStr);

  return (
    <>
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <AppointmentMain appointments={appointments} />
      </Main>
    </>
  );
}
