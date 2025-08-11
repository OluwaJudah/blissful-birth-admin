"use client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import AppointmentDateTimeSlot from "./appointment-date-timeslot";
import { getAppointmentsForFilter } from "@/data/appointment";
// import SelectFilter from "@/components/appointments/components/select-filter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Appointments = ({ appointments }: { appointments: any[] }) => {
  const today = new Date();
  const sevenDaysFromNow = new Date();
  today.setDate(today.getDate() - 1);
  const dateStr = today.toISOString().split("T")[0];
  sevenDaysFromNow.setDate(today.getDate() + 8);
  const sevenDaysFromNowStr = sevenDaysFromNow.toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState(dateStr);
  const [toDate, setToDate] = useState(sevenDaysFromNowStr);
  const [isLoading, setIsLoading] = useState(false);
  const [allAppointments, setAllAppointments] = useState(0);
  const [pendingAppointment, setPendingAppointment] = useState(0);
  const [confirmedAppointment, setConfirmedAppointment] = useState(0);
  const [completedAppointment, setCompletedAppointment] = useState(0);
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
    filterByStatusInit(appointments);
  }, []);

  const onChangeFromDate = async (e: any) => {
    const fromDate = e.target.value;
    setFromDate(fromDate);

    setIsLoading(true);
    const appointments = await getAppointmentsForFilter(fromDate);
    setAppointmentsData(appointments);
    filterByStatus(appointments, "pending");
    filterByStatusInit(appointments);
    setIsLoading(false);
  };

  const onChangeToDate = async (e: any) => {
    const toDate = e.target.value;
    setToDate(toDate);

    setIsLoading(true);
    const appointments = await getAppointmentsForFilter(fromDate, toDate);
    setAppointmentsData(appointments);
    filterByStatus(appointments, "pending");
    filterByStatusInit(appointments);
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

  const filterByStatusInit = async (appointments: any[]) => {
    let pending = 0;
    let confirmed = 0;
    let completed = 0;
    let allAppointments = 0;

    appointments.forEach((entry) => {
      entry.slots.forEach((slot: any) => {
        slot.appointments.forEach((app: any) => {
          allAppointments++;
          if (app.status.toLowerCase() === "pending") ++pending;
          else if (app.status.toLowerCase() === "confirmed") ++confirmed;
          else if (app.status.toLowerCase() === "completed") ++completed;
        });

        // Only keep the slot if it has matching appointments
      });

      // Only keep the entry if it has matching slots
    });
    setAllAppointments(allAppointments);
    setPendingAppointment(pending);
    setConfirmedAppointment(confirmed);
    setCompletedAppointment(completed);
  };

  const clearFilter = () => {
    setIsLoading(false);
    setToDate("");
    setFromDate("");
  };

  const statusArr = [
    { name: "All", data: allAppointments, value: "all" },
    { name: "Pending", data: pendingAppointment, value: "pending" },
    { name: "Confirmed", data: confirmedAppointment, value: "confirmed" },
    { name: "Completed", data: completedAppointment, value: "completed" },
  ];

  const StatusButton = ({
    value,
    data,
    name,
  }: {
    value: string;
    data: number;
    name: string;
  }) => {
    return (
      <Button
        type="button"
        onClick={() => filterByStatus(appointments, value)}
        className={
          status === value
            ? ""
            : "border-2 border-gray bg-white text-black hover:bg-gray-200"
        }
      >
        {name}{" "}
        <Badge className={status === value ? "bg-white text-black" : ""}>
          {data}
        </Badge>
      </Button>
    );
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
        <div className="flex flex-col gap-4 items-start xl:flex-row xl:items-center justify-between mb-2 border-2 border-gray-200 p-2 rounded-xl w-full">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium">Choose Date Range:</div>
            <div className="flex flex-row gap-3">
              <div className="flex flex-row items-center gap-1">
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
              <div className="flex flex-row items-center gap-1">
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
              <div className="flex flex-row items-center gap-1">
                <div className="text-sm font-medium">Filter User:</div>
                <Input
                  placeholder="Filter users..."
                  className="w-[200px] flex flex-col justify-center"
                  onChange={onChangeFilterUser}
                />
              </div>

              {/* <div className="flex flex-row items-center gap-3">
                <div className="text-sm font-medium">Filter Status:</div>
                <SelectFilter
                  appointments={appointments}
                  filterByStatus={filterByStatus}
                  status={status}
                  setStatus={setStatus}
                />
              </div> */}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm font-medium">Filter Status:</div>
            <div className="flex flex-row items-center gap-3">
              {statusArr.map((s) => (
                <StatusButton key={s.value} {...s} />
              ))}
            </div>
          </div>{" "}
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
