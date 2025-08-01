"use client";
import { IAppointment } from "@/definitions/appointment";
import { useUsers } from "./context/users-context";
import { UsersActionDialog } from "./users-action-dialog";
import { CreateNotificationActionDialog } from "./create-notification-dialog";
import { DeleteAppointmentDialog } from "./users-delete-dialog";

export function UsersDialogs({
  appointmentId,
  appointmentData,
  userId,
}: {
  appointmentId: string;
  appointmentData: IAppointment;
  userId: string;
}) {
  const { open, setOpen } = useUsers();
  return (
    <>
      <CreateNotificationActionDialog
        userId={userId}
        appointmentId={appointmentId}
        open={open === "send-reminder"}
        onOpenChange={() => setOpen("send-reminder")}
      />

      <UsersActionDialog
        key="user-add"
        appointmentId={appointmentId}
        appointmentData={appointmentData}
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />

      <DeleteAppointmentDialog
        key="user-delete"
        userId={userId}
        appointmentId={appointmentId}
        open={open === "delete"}
        onOpenChange={() => setOpen("delete")}
      />
    </>
  );
}
