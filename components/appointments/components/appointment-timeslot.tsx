import React from "react";
import AppointmentDetails from "./appointment-details";

const AppointmentTimeslot = ({
  time,
  appointments,
}: {
  time: string;
  appointments: any[];
}) => {
  return (
    <>
      <h2 className="mb-1 font-semibold">Timeslot: {time}</h2>
      <div className="flex flex-col gap-1">
        {appointments.map((a) => (
          <AppointmentDetails key={a._id} {...{ ...a }} />
        ))}
      </div>
    </>
  );
};

export default AppointmentTimeslot;
