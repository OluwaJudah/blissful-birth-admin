import AppointmentDateTimeSlot from "./appointment-date-timeslot";

const AppointmentList = ({ filteredAppointmentsData }: any) => (
  <div className="flex flex-col gap-2">
    {filteredAppointmentsData &&
      filteredAppointmentsData.length > 0 &&
      filteredAppointmentsData.map((a: any, index: number) => {
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
);

export default AppointmentList;
