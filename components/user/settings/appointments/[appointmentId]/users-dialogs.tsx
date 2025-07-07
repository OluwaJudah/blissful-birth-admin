"use client";
import { IAppointment } from "@/definitions/appointment";
import { useUsers } from "./context/users-context";
import { UsersActionDialog } from "./users-action-dialog";

export function UsersDialogs({
  appointmentId,
  appointmentData,
}: {
  appointmentId: string;
  appointmentData: IAppointment;
}) {
  const { open, setOpen } = useUsers();
  return (
    <>
      <UsersActionDialog
        key="user-add"
        appointmentId={appointmentId}
        appointmentData={appointmentData}
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
    </>
  );
}
