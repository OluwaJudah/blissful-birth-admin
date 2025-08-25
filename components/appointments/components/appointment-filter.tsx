import { Input } from "@/components/ui/input";
import { getAppointmentsForFilter } from "@/data/appointment";

const AppointmentsFilters = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  setIsLoading,
  resetDates,
  setAppointmentsData,
  setfilteredAppointmentsData,
  filterByStatus,
  filterByStatusInit,
  appointments,
}: any) => {
  const onChangeFromDate = async (e: any) => {
    const value = e.target.value;
    const nextFromDate = value ? new Date(value) : null;
    setFromDate(nextFromDate);

    setIsLoading(true);
    const appts = await getAppointmentsForFilter(value || undefined);
    setAppointmentsData(appts);
    filterByStatus(appts, "all");
    filterByStatusInit(appts);
    setIsLoading(false);
  };

  const onChangeToDate = async (e: any) => {
    const value = e.target.value;
    const nextToDate = value ? new Date(value) : null;
    setToDate(nextToDate);

    setIsLoading(true);
    const appts = await getAppointmentsForFilter(
      fromDate ? fromDate.toISOString().split("T")[0] : undefined,
      value || undefined
    );
    setAppointmentsData(appts);
    filterByStatus(appts, "all");
    filterByStatusInit(appts);
    setIsLoading(false);
  };

  const onChangeFilterUser = (e: any) => {
    const search = e.target.value.toLowerCase();

    const filteredData = appointments
      .map((entry: any) => {
        const filteredSlots = entry.slots
          .map((slot: any) => {
            const filteredAppointments = slot.appointments.filter(
              (app: any) => {
                const fullName = app.fullName.toLowerCase();
                const surname = app.surname.toLowerCase();
                return fullName.includes(search) || surname.includes(search);
              }
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

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium">Choose Date Range:</div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-row items-center gap-1">
          <div className="text-sm font-medium">From:</div>
          <Input
            placeholder="Filter apps..."
            className="w-[200px] flex flex-col justify-center"
            defaultValue={fromDate ? fromDate.toISOString().split("T")[0] : ""}
            type="date"
            onChange={onChangeFromDate}
            onClick={resetDates}
          />
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="text-sm font-medium">To:</div>
          <Input
            placeholder="Filter apps..."
            className="w-[200px] flex flex-col justify-center"
            defaultValue={toDate ? toDate.toISOString().split("T")[0] : ""}
            type="date"
            min={fromDate ? fromDate.toISOString().split("T")[0] : undefined}
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
  );
};

export default AppointmentsFilters;
