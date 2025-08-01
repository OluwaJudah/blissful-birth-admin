"use client";
import { IconAlertTriangle } from "@tabler/icons-react";
import { toast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { deleteAppointment } from "@/actions/appointment";

interface Props {
  userId: string;
  appointmentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteAppointmentDialog({
  userId,
  appointmentId,
  open,
  onOpenChange,
}: Props) {
  const pathname = "/user/settings/" + userId + "/appointments";

  const handleDelete = async () => {
    await deleteAppointment(appointmentId, pathname);
    onOpenChange(false);
    toast({
      title: "The following user has been deleted:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(appointmentId, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Delete Appointment
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete appointment entry?
            <br />
            This action will permanently remove the appointment entry from the
            system. This cannot be undone.
          </p>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
}
