"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { getAppointmentsForFilter } from "@/data/appointment";
import { useAppointmentDateFilter } from "./appointment-date-context";
import { AppointmentSelectionProvider } from "./appointment-selected-context";
import AppointmentsHeader from "./appointment-header";
import AppointmentsFilters from "./appointment-filter";
import AppointmentStatusButtons from "./appointment-status-button";
import AppointmentList from "./appointment-list";
import AppointmentLoader from "./appointment-loader";

export const Appointments = ({ appointments }: { appointments: any[] }) => {
  const { fromDate, toDate, setFromDate, setToDate, resetDates } =
    useAppointmentDateFilter();

  const [isLoading, setIsLoading] = useState(false);
  const [appointmentsData, setAppointmentsData] = useState<any[]>([]);
  const [filteredAppointmentsData, setfilteredAppointmentsData] = useState<
    any[]
  >([]);
  const [status, setStatus] = useState("all");

  const [stats, setStats] = useState({
    all: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    missed: 0,
  });

  const statusMap = {
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    completed: "Completed",
    missed: "Missed",
    all: "",
  };

  const getAppointmentInit = async () => {
    const appts = await getAppointmentsForFilter(
      fromDate ? fromDate.toISOString().split("T")[0] : undefined,
      toDate ? toDate.toISOString().split("T")[0] : undefined
    );
    setAppointmentsData(appts);
    filterByStatus(appts, "all");
    filterByStatusInit(appts);
  };

  useEffect(() => {
    getAppointmentInit();
  }, []);

  const filterByStatus = (appointments: any[], status: string) => {
    setStatus(status);
    if (status === "all") {
      setfilteredAppointmentsData(appointments);
      return;
    }

    const filteredData = appointments
      .map((entry) => {
        const filteredSlots = entry.slots
          .map((slot: any) => {
            const filteredAppointments = slot.appointments.filter(
              (app: any) => app.status.toLowerCase() === status
            );
            return filteredAppointments.length > 0
              ? { ...slot, appointments: filteredAppointments }
              : null;
          })
          .filter(Boolean);

        return filteredSlots.length > 0
          ? { ...entry, slots: filteredSlots }
          : null;
      })
      .filter(Boolean);

    setfilteredAppointmentsData(filteredData);
  };

  const filterByStatusInit = (appointments: any[]) => {
    let pending = 0,
      confirmed = 0,
      completed = 0,
      missed = 0,
      all = 0;

    appointments.forEach((entry) => {
      entry.slots.forEach((slot: any) => {
        slot.appointments.forEach((app: any) => {
          all++;
          if (app.status.toLowerCase() === "pending") ++pending;
          else if (app.status.toLowerCase() === "confirmed") ++confirmed;
          else if (app.status.toLowerCase() === "completed") ++completed;
          else if (app.status.toLowerCase() === "missed") ++missed;
        });
      });
    });

    setStats({ all, pending, confirmed, completed, missed });
  };

  return (
    <>
      <AppointmentsHeader
        status={status}
        statusMap={statusMap}
        fromDate={fromDate}
        toDate={toDate}
      />

      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex flex-col gap-4 items-start xl:flex-row xl:items-center justify-between mb-2 border-2 border-gray-200 p-2 rounded-xl w-full">
          <AppointmentsFilters
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
            setIsLoading={setIsLoading}
            resetDates={resetDates}
            setAppointmentsData={setAppointmentsData}
            setfilteredAppointmentsData={setfilteredAppointmentsData}
            filterByStatus={filterByStatus}
            filterByStatusInit={filterByStatusInit}
            appointments={appointments}
          />

          <AppointmentStatusButtons
            status={status}
            stats={stats}
            filterByStatus={(value: string) =>
              filterByStatus(appointmentsData, value)
            }
          />
        </div>

        {isLoading && <AppointmentLoader />}

        <AppointmentSelectionProvider>
          <AppointmentList
            filteredAppointmentsData={filteredAppointmentsData}
          />
        </AppointmentSelectionProvider>
      </div>
    </>
  );
};
