import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { getAppointmentsForFilter } from "@/data/appointment";
import AppointmentsDateFilter from "@/components/notifications/notifications-date-filter";
import { Suspense } from "react";

export default async function Notifications() {
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
        <div className="mb-0 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
            <p className="text-muted-foreground">
              Manage your client appointments here.
            </p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Suspense fallback={<>Loading...</>}>
            <AppointmentsDateFilter appointments={appointments} />
          </Suspense>
        </div>
      </Main>
    </>
  );
}
