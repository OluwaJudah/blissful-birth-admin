"use client";

import { Suspense, useEffect } from "react";
import { AppointmentDateFilterProvider } from "./appointment-date-context";
import { Appointments } from "@/components/appointments/components/appointments";

const AppointmentMain = ({ appointments }: { appointments: any[] }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && "screen" in window) {
      const orientation: any = (window as any).screen?.orientation;
      if (orientation && typeof orientation.lock === "function") {
        orientation.lock("landscape").catch(() => {});
      }
    }
  }, []);

  return (
    <AppointmentDateFilterProvider>
      <Suspense fallback={<>Loading...</>}>
        <Appointments appointments={appointments} />
      </Suspense>
    </AppointmentDateFilterProvider>
  );
};

export default AppointmentMain;
