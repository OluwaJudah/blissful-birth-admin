import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { columns } from "@/components/appointments/components/users-columns";
import { UsersDialogs } from "@/components/appointments/components/users-dialogs";
import { UsersTable } from "@/components/appointments/components/users-table";
import UsersProvider from "@/components/appointments/context/users-context";
import { appointmentListSchema } from "@/components/appointments/data/schema";
import { users } from "@/components/appointments/data/users";

export default function Users() {
  // Parse user list
  const userList = appointmentListSchema.parse(users);

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
          <UsersTable data={userList} columns={columns} />
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  );
}
