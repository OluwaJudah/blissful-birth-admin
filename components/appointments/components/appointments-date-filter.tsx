"use client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import AppointmentDateTimeSlot from "./appointment-date-timeslot";
import { getAppointmentsForFilter } from "@/data/appointment";

const AppointmentsDateFilter = ({ appointments }: { appointments: any[] }) => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const dateStr = today.toISOString().split("T")[0];
  today.setDate(today.getDate() + 8);
  const thirtyDayStr = today.toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState(dateStr);
  const [toDate, setToDate] = useState(thirtyDayStr);
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentsData, setAppointmentsData] = useState<any[]>([]);
  const [filteredAppointmentsData, setfilteredAppointmentsData] = useState<
    any[]
  >([]);

  useEffect(() => {
    setAppointmentsData(appointments);
    setfilteredAppointmentsData(appointments);
  }, []);

  const onChangeFromDate = async (e: any) => {
    const fromDate = e.target.value;
    setFromDate(fromDate);

    setIsLoading(true);
    const appointments = await getAppointmentsForFilter(fromDate);
    setAppointmentsData(appointments);
    setfilteredAppointmentsData(appointments);
    setIsLoading(false);
  };

  const onChangeToDate = async (e: any) => {
    const toDate = e.target.value;
    setToDate(toDate);

    setIsLoading(true);
    const appointments = await getAppointmentsForFilter(fromDate, toDate);
    setAppointmentsData(appointments);
    setfilteredAppointmentsData(appointments);
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

  const clearFilter = () => {
    setIsLoading(false);
    setToDate("");
    setFromDate("");
  };

  return (
    <>
      <div className="flex flex-row items-center gap-8 mb-2 border border-gray-200 p-4 rounded-xl w-full">
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
    </>
  );
};

export default AppointmentsDateFilter;
