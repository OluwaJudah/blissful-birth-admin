"use client";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import AppointmentDateTimeSlot from "@/components/appointments/components/appointment-date-timeslot";
import { appointments } from "@/data/appointment";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function Appointments() {
  // Parse user list
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const [date, setDate] = useState(dateStr);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeDate = (e: any) => {
    setDate(e.target.value);
    setIsLoading(true);
  };
  const onChangeFromDate = (e: any) => {
    setFromDate(e.target.value);
  };
  const onChangeToDate = (e: any) => {
    setToDate(e.target.value);
    setIsLoading(true);
  };

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
        <div className="mb-0 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
            <p className="text-muted-foreground">
              Manage your client appointments here.
            </p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex flex-row items-center gap-8 mb-2 border border-gray-200 p-4 rounded-xl w-full">
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium">Filter By Date:</div>
              <Input
                placeholder="Filter apps..."
                className="w-[200px] flex flex-col justify-center"
                defaultValue={date}
                type="date"
                onChange={onChangeDate}
                onClick={() => setIsLoading(false)}
              />
            </div>
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
                    onClick={() => setIsLoading(false)}
                  />
                </div>
                <div className="flex flex-row items-center gap-3">
                  <div className="text-sm font-medium">To:</div>
                  <Input
                    placeholder="Filter apps..."
                    className="w-[200px] flex flex-col justify-center"
                    defaultValue={toDate}
                    type="date"
                    disabled={!fromDate}
                    onChange={onChangeToDate}
                    onClick={() => setIsLoading(false)}
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

          <div className="flex flex-col gap-3">
            {appointments.map((a, index) => {
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
      </Main>
    </>
  );
}
