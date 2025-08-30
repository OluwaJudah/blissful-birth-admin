"use client";

import { Button } from "@/components/ui/button";
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

import { MonthlyIntakeChart } from "@/components/dashboard/monthlly-intake";
import { AppointmentStatusChart } from "@/components/dashboard/appointment-status-chart";
import { PatientsTable } from "@/components/dashboard/patients-table";
import { PatientTable } from "@/components/dashboard/patient-table";
import KpiCard from "@/components/dashboard/kpi-card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentSalesList } from "@/components/dashboard/recent-sales";

import {
  User,
  Calendar,
  DollarSign,
  ClipboardList,
  CheckCircle,
} from "lucide-react";
import { IconUsersGroup } from "@tabler/icons-react";

const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
    disabled: true,
  },
];

const patientsDue = [
  { id: 1, name: "Sarah M.", dueDate: "2025-08-21" },
  { id: 2, name: "Jane D.", dueDate: "2025-08-24" },
  { id: 3, name: "Emily K.", dueDate: "2025-08-28" },
];

export default function Dashboard() {
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
          <div className="flex items-center space-x-2">
            <Button>Download</Button>
          </div>
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard title="Total Patients" value="1,245" icon={<User />} />
              <KpiCard
                title="Active Client"
                value="70"
                icon={<IconUsersGroup />}
              />
              <KpiCard
                title="New Patient Intake"
                value="52"
                icon={<ClipboardList />}
              />
              <KpiCard
                title="Total Appointments"
                value="3,489"
                icon={<Calendar />}
              />
              <KpiCard
                title="Revenue"
                value="R 452,310"
                icon={<DollarSign />}
              />
              <KpiCard
                title="Mothers Due This Month"
                value="18"
                icon={<CheckCircle />}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              <Card className="col-span-1 lg:col-span-6">
                <CardHeader>
                  <CardTitle>Monthly Intake of New Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonthlyIntakeChart />
                </CardContent>
              </Card>

              <Card className="col-span-1 lg:col-span-6">
                <CardHeader>
                  <CardTitle>Appointment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <AppointmentStatusChart />
                </CardContent>
              </Card>

              <Card className="col-span-1 lg:col-span-6">
                <CardHeader>
                  <CardTitle>Patients Due This Month</CardTitle>
                  <CardDescription>
                    Showing expected deliveries this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PatientTable patients={patientsDue} />
                </CardContent>
              </Card>

              <Card className="col-span-1 lg:col-span-6">
                <CardHeader>
                  <CardTitle>Patients Due Per Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="august">
                    <TabsList className="overflow-x-auto border-b border-black">
                      {[
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((m) => (
                        <TabsTrigger
                          key={m}
                          value={m.toLowerCase()}
                          className="text-black"
                        >
                          {m}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <TabsContent value="august">
                      <PatientTable patients={patientsDue} />
                    </TabsContent>
                    <TabsContent value="september">
                      <PatientTable
                        patients={[
                          { id: 4, name: "Grace O.", dueDate: "2025-09-12" },
                        ]}
                      />
                    </TabsContent>
                    <TabsContent value="october">
                      <PatientTable
                        patients={[
                          { id: 5, name: "Lara B.", dueDate: "2025-10-05" },
                        ]}
                      />
                    </TabsContent>
                    <TabsContent value="november">
                      <PatientTable patients={[]} />
                    </TabsContent>
                    <TabsContent value="december">
                      <PatientTable patients={[]} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

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
