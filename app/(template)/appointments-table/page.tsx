import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { columns } from "@/components/appointments/components/users-columns";
import { UsersDialogs } from "@/components/appointments/components/users-dialogs";
import { UsersTable } from "@/components/appointments/components/users-table";
import UsersProvider from "@/components/appointments/context/users-context";
import { getAppointments } from "@/data/appointment";
import { IAppointmentData } from "@/definitions/appointment";

export default async function Users() {
  // Parse user list
  const data = (await getAppointments()) as IAppointmentData[];
  const clients = JSON.parse(JSON.stringify(data));

  return (
    <UsersProvider>
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
            <p className="text-muted-foreground">
              Manage your client appointments here.
            </p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <UsersTable data={clients} columns={columns} />
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  );
}
