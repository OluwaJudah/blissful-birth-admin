import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { columns } from "@/components/users/components/users-columns";
import { UsersDialogs } from "@/components/users/components/users-dialogs";
import { UsersTable } from "@/components/users/components/users-table";
import UsersProvider from "@/components/users/context/users-context";
import { getMotherInfoWithPaymentSum } from "@/data/mother-info";

export const revalidate = 60;

export default async function Users({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string; search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams.page) || 0;
  const pageSize = Number(resolvedSearchParams.pageSize) || 10;
  const searchTerm = resolvedSearchParams.search || "";

  const { data, totalCount } = await getMotherInfoWithPaymentSum(
    currentPage,
    pageSize,
    searchTerm
  );
  const clients = JSON.parse(JSON.stringify(data));
  const pageCount = Math.ceil(totalCount / pageSize);

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
            <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
            <p className="text-muted-foreground">Manage your clients here.</p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Suspense fallback={<>Loading...</>}>
            <UsersTable
              data={clients}
              columns={columns}
              pageCount={pageCount}
              totalCount={totalCount}
            />
          </Suspense>
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  );
}
