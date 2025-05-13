import AppointmentTimeslot from "./appointment-timeslot";

const AppointmentDateTimeSlot = ({
  date,
  slots,
}: {
  date: string;
  slots: { time: string; appointments: any[] }[];
}) => {
  return (
    <>
      <h2 className="font-semibold">{date}</h2>
      <div className="flex flex-col gap-1">
        {slots.map((s, index) => (
          <AppointmentTimeslot
            key={index}
            time={s.time}
            appointments={s.appointments}
          />
        ))}
      </div>
    </>
  );
};

export default AppointmentDateTimeSlot;
