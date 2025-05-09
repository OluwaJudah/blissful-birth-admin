"use client";
import { useUsers } from "./context/users-context";
import { UsersActionDialog } from "./users-action-dialog";

export function UsersDialogs({ appointmentId }: { appointmentId: string }) {
  const { open, setOpen } = useUsers();
  return (
    <>
      <UsersActionDialog
        key="user-add"
        appointmentId={appointmentId}
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
    </>
  );
}
