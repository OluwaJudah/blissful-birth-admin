"use client";
import { useUsers } from "./context/users-context";
import { CreateNewActionDialog } from "./create-new-dialog";
import { PrintAppointmentModal } from "./print-appointment-modal";
import { GenerateAppointmentDialog } from "./generate-appointment-dialog";
import { CloseAppointmentDialog } from "./close-appointment-dialog";

export function UsersDialogs({ userId }: { userId: string }) {
  const { open, setOpen } = useUsers();
  return (
    <>
      <CreateNewActionDialog
        userId={userId}
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
      <PrintAppointmentModal
        open={open === "print"}
        onOpenChange={() => setOpen("print")}
      />

      <GenerateAppointmentDialog
        userId={userId}
        open={open === "generate"}
        onOpenChange={() => setOpen("generate")}
      />
      {/* Close Appointment Dialog */}
      <CloseAppointmentDialog
        userId={userId}
        open={open === "close"}
        onOpenChange={() => setOpen("close")}
      />
    </>
  );
}
