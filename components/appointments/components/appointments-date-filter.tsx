"use client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import AppointmentDateTimeSlot from "./appointment-date-timeslot";
import { getAppointmentsForFilter } from "@/data/appointment";

const AppointmentsDateFilter = ({ appointments }: { appointments: any[] }) => {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  today.setDate(today.getDay() + 7);
  const thirtyDayStr = today.toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState(dateStr);
  const [toDate, setToDate] = useState(thirtyDayStr);
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentsData, setAppointmentsData] = useState<any[]>([]);

  useEffect(() => {
    setAppointmentsData(appointments);
  }, []);

  const onChangeFromDate = async (e: any) => {
    const fromDate = e.target.value;
    setFromDate(fromDate);

    setIsLoading(true);
    const appointments = await getAppointmentsForFilter(fromDate);
    setAppointmentsData(appointments);
    setIsLoading(false);
  };

  const onChangeToDate = async (e: any) => {
    const toDate = e.target.value;
    setToDate(toDate);

    setIsLoading(true);
    const appointments = await getAppointmentsForFilter(fromDate, toDate);
    setAppointmentsData(appointments);
    setIsLoading(false);
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
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="w-full">
          <LoaderCircle size={30} className="animate-spin mx-auto" />
        </div>
      )}
      <div className="flex flex-col gap-2">
        {appointmentsData &&
          appointmentsData.length > 0 &&
          appointmentsData.map((a, index) => {
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
