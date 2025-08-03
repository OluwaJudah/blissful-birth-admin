"use client";
import { IconAlertTriangle } from "@tabler/icons-react";
import { toast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { closeAppointment } from "@/actions/appointment";

interface Props {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CloseAppointmentDialog({ userId, open, onOpenChange }: Props) {
  const pathname = "/user/settings/" + userId;

  const handleClose = async () => {
    await closeAppointment(userId, pathname);
    onOpenChange(false);
    toast({
      title: "The following user has been closed:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(userId, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleClose}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Close Appointments
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to close the appointment?
            <br />
            This action will permanently close the appointment. This cannot be
            undone.
          </p>
        </div>
      }
      confirmText="Close"
      destructive
    />
  );
}
