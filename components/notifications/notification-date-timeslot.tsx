import NotificationTimeslot from "./notification-timeslot";

const NotificationDateTimeSlot = ({
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
          <NotificationTimeslot
            key={index}
            time={s.time}
            appointments={s.appointments}
          />
        ))}
      </div>
    </>
  );
};

export default NotificationDateTimeSlot;
