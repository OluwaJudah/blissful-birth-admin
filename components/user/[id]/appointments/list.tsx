import AppointmentEntry from "./AppointmentEntry";
import { getMotherAppointments } from "@/data/appointment";

const AppointmentList = async ({ id }: { id: string }) => {
  const appointments = await getMotherAppointments(id);

  return (
    <div className="-mx-1 px-1.5 flex flex-col gap-1 lg:max-w-xl">
      {appointments.map(({ _id, date, time, status, pregnancyWeeks, type }) => (
        <AppointmentEntry
          key={_id.toString()}
          id={_id.toString()}
          date={date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
          time={time}
          status={status || ""}
          pregnancyWeeks={pregnancyWeeks}
          userId={id}
          type={type || ""}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
