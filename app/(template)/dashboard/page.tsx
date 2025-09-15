import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentSalesList } from "@/components/dashboard/recent-sales";
import {
  getAppointmentStatusData,
  getKpiData,
  getMonthlyIntakeData,
} from "@/data/dashboard";
import KpiCards from "@/components/dashboard/kpi-cards";
import DuePatientTables from "@/components/dashboard/due-patients-tables";
import Charts from "@/components/dashboard/charts";
import { patientsDue, topNav } from "@/constants/dashboard";

export default async function Dashboard() {
  const kpiData = await getKpiData();
  const monthlyIntakeData = await getMonthlyIntakeData();
  const appointmentStatusData = await getAppointmentStatusData();

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
            <KpiCards kpiData={kpiData} />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              <Charts
                data={monthlyIntakeData}
                appointmentStatusData={appointmentStatusData}
              />

              <DuePatientTables patientsDue={patientsDue} />

              <Card className="col-span-1 lg:col-span-6">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <OverviewChart />
                </CardContent>
              </Card>

              <Card className="col-span-1 lg:col-span-6">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSalesList />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  );
}
