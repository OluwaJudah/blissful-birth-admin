"use client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import AppointmentDateTimeSlot from "./appointment-date-timeslot";
import { getAppointmentsForFilter } from "@/data/appointment";
import SelectFilter from "@/components/appointments/components/select-filter";

const AppointmentsDateFilter = ({ appointments }: { appointments: any[] }) => {
  const today = new Date();
  const sevenDaysFromNow = new Date();
  today.setDate(today.getDate() - 1);
  const dateStr = today.toISOString().split("T")[0];
  sevenDaysFromNow.setDate(today.getDate() + 8);
  const sevenDaysFromNowStr = sevenDaysFromNow.toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState(dateStr);
  const [toDate, setToDate] = useState(sevenDaysFromNowStr);
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentsData, setAppointmentsData] = useState<any[]>([]);
  const [filteredAppointmentsData, setfilteredAppointmentsData] = useState<
    any[]
  >([]);
  const [status, setStatus] = useState("pending");
  const statusMap = {
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    completed: "Completed",
    all: "",
  };

  useEffect(() => {
    setAppointmentsData(appointments);
    filterByStatus(appointments, "pending");
  }, []);

  const onChangeFromDate = async (e: any) => {
    const fromDate = e.target.value;
    setFromDate(fromDate);

    setIsLoading(true);
    const appointments = await getAppointmentsForFilter(fromDate);
    setAppointmentsData(appointments);
    filterByStatus(appointments, "pending");
    setIsLoading(false);
  };

  const onChangeToDate = async (e: any) => {
    const toDate = e.target.value;
    setToDate(toDate);

    setIsLoading(true);
    const appointments = await getAppointmentsForFilter(fromDate, toDate);
    setAppointmentsData(appointments);
    filterByStatus(appointments, "pending");
    setIsLoading(false);
  };

  const onChangeFilterUser = async (e: any) => {
    const search = e.target.value.toLowerCase();

    const filteredData = appointments
      .map((entry) => {
        const filteredSlots = entry.slots
          .map((slot: any) => {
            const filteredAppointments = slot.appointments.filter(
              (app: any) => {
                const fullName = app.fullName.toLowerCase();
                const surname = app.surname.toLowerCase();
                return fullName.includes(search) || surname.includes(search);
              }
            );

            // Only keep the slot if it has matching appointments
            return filteredAppointments.length > 0
              ? { ...slot, appointments: filteredAppointments }
              : null;
          })
          .filter((slot: any) => slot !== null); // remove empty slots

        // Only keep the entry if it has matching slots
        return filteredSlots.length > 0
          ? { ...entry, slots: filteredSlots }
          : null;
      })
      .filter((entry) => entry !== null); // remove empty entries

    setfilteredAppointmentsData(filteredData);
  };

  const filterByStatus = async (appointments: any[], status: string) => {
    if (status === "all") {
      setfilteredAppointmentsData(appointments);
      return;
    }

    const filteredData = appointments
      .map((entry) => {
        const filteredSlots = entry.slots
          .map((slot: any) => {
            const filteredAppointments = slot.appointments.filter(
              (app: any) => {
                return app.status.toLowerCase() === status;
              }
            );

            // Only keep the slot if it has matching appointments
            return filteredAppointments.length > 0
              ? { ...slot, appointments: filteredAppointments }
              : null;
          })
          .filter((slot: any) => slot !== null); // remove empty slots

        // Only keep the entry if it has matching slots
        return filteredSlots.length > 0
          ? { ...entry, slots: filteredSlots }
          : null;
      })
      .filter((entry) => entry !== null); // remove empty entries

    setfilteredAppointmentsData(filteredData);
  };

  const clearFilter = () => {
    setIsLoading(false);
    setToDate("");
    setFromDate("");
  };

  return (
    <>
      <div className="mb-0 flex flex-wrap items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {statusMap[status as keyof typeof statusMap]} Appointments -{" "}
            {new Date(fromDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            {" to "}
            {new Date(toDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </h2>
          <p className="text-muted-foreground">
            Manage your client appointments here.
          </p>
        </div>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex flex-row items-center justify-between gap-8 mb-2 border border-gray-200 p-4 rounded-xl w-full">
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium">Choose Date Range:</div>
            <div className="flex flex-row gap-8">
              <div className="flex flex-row items-center gap-3">
                <div className="text-sm font-medium">From:</div>
                <Input
                  placeholder="Filter apps..."
                  className="w-[200px] flex flex-col justify-center"
                  defaultValue={fromDate}
                  type="date"
                  onChange={onChangeFromDate}
                  onClick={clearFilter}
                />
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="text-sm font-medium">To:</div>
                <Input
                  placeholder="Filter apps..."
                  className="w-[200px] flex flex-col justify-center"
                  defaultValue={toDate}
                  type="date"
                  min={fromDate}
                  disabled={!fromDate}
                  onChange={onChangeToDate}
                />
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="text-sm font-medium">Filter User:</div>
                <Input
                  placeholder="Filter users..."
                  className="w-[200px] flex flex-col justify-center"
                  onChange={onChangeFilterUser}
                />
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="text-sm font-medium">Filter Status:</div>
                <SelectFilter
                  appointments={appointments}
                  filterByStatus={filterByStatus}
                  status={status}
                  setStatus={setStatus}
                />
              </div>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="w-full">
            <LoaderCircle size={30} className="animate-spin mx-auto" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          {filteredAppointmentsData &&
            filteredAppointmentsData.length > 0 &&
            filteredAppointmentsData.map((a, index) => {
              const dateStr = new Date(a.date);
              return (
                <AppointmentDateTimeSlot
                  date={dateStr.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  slots={a.slots}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AppointmentsDateFilter;
