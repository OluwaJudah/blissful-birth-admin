"use client";

import { Suspense } from "react";
import { AppointmentDateFilterProvider } from "./appointment-date-context";
import { Appointments } from "@/components/appointments/components/appointments";

const AppointmentMain = ({ appointments }: { appointments: any[] }) => {
  
  return (
    <AppointmentDateFilterProvider>
      <Suspense fallback={<>Loading...</>}>
        <Appointments appointments={appointments} />
      </Suspense>
    </AppointmentDateFilterProvider>
  );
};

export default AppointmentMain;
