"use client"; // 👈 required because we need access to `window`

import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import AppointmentMain from "@/components/appointments/components/appointment-main";
import { getAppointmentsForFilter } from "@/data/appointment";

export const revalidate = 0;

export default function AppointmentsPage({
  appointments,
}: {
  appointments: any[];
}) {
  useEffect(() => {
    if (typeof window !== "undefined" && "screen" in window) {
      const orientation: any = (window as any).screen?.orientation;
      if (orientation && typeof orientation.lock === "function") {
        orientation.lock("landscape").catch(() => {});
      }
    }
  }, []);
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

// ✅ Get data via a server function
export async function generateStaticParams() {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const dateStr = today.toISOString().split("T")[0];
  today.setDate(today.getDate() + 8);
  const thirtyDayStr = today.toISOString().split("T")[0];
  const appointments = await getAppointmentsForFilter(dateStr, thirtyDayStr);

  return { appointments };
}
