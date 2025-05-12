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
      <h2 className="mb-1 font-semibold">{date}</h2>
      <div className="flex flex-col gap-3">
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
