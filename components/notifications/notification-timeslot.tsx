import NotificationDetails from "./notification-details";

const NotificationTimeslot = ({
  time,
  appointments,
}: {
  time: string;
  appointments: any[];
}) => {
  return (
    <>
      <h2 className="font-semibold">Timeslot: {time}</h2>
      <div className="flex flex-col gap-1">
        {appointments.map((a) => (
          <NotificationDetails key={a._id} {...{ ...a }} />
        ))}
      </div>
    </>
  );
};

export default NotificationTimeslot;
