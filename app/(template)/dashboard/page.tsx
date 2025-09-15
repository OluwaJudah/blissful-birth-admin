// app/dashboard/page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import KpiCards from "@/components/dashboard/kpi-cards";
import DuePatientTables from "@/components/dashboard/due-patients-tables";
import { topNav } from "@/constants/dashboard";
import Charts from "@/components/dashboard/charts";
import { Suspense } from "react";
import KpiCardsSkeleton from "@/components/dashboard/kpi-cards-skeleton";
import MonthlyIntakeBarChart from "@/components/dashboard/monthly-intake-barchart";
import MonthlyIntakeBarChartSkeleton from "@/components/dashboard/monthly-intake-chart-skeleton";
import AppointmentStatusPieChart from "@/components/dashboard/appointment-status-pie-chart";
import AppointmentStatusPieChartSkeleton from "@/components/dashboard/appointment-status-pie-chart-skeleton";
import DuePatientTablesSkeleton from "@/components/dashboard/due-patients-tables-skeleton";

export const revalidate = 3600;

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: Promise<{ year?: string; month?: string }>;
}) {
  const searchParamsObj = await searchParams;
  const now = new Date();
  const year = Number(searchParamsObj?.year ?? now.getFullYear());
  const month = Number(searchParamsObj?.month ?? now.getMonth()); // 0-based

  return (
    <>
      <Header>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>

        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <div className="w-full overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <Suspense fallback={<KpiCardsSkeleton />}>
              <KpiCards />
            </Suspense>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              <Suspense fallback={<MonthlyIntakeBarChartSkeleton />}>
                <MonthlyIntakeBarChart />
              </Suspense>
              <Suspense fallback={<AppointmentStatusPieChartSkeleton />}>
                <AppointmentStatusPieChart />
              </Suspense>

              <Suspense fallback={<DuePatientTablesSkeleton />}>
                <DuePatientTables year={year} month={month} />
              </Suspense>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  );
}
