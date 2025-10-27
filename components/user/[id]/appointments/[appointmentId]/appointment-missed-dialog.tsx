"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUsers } from "./context/users-context";
import { IconAlertTriangle } from "@tabler/icons-react";
import { deleteAppointment, missedAppointment } from "@/actions/appointment";
import { toast } from "@/hooks/use-toast";

interface Props {
  userId: string;
  appointmentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentMissedDialog({
  userId,
  appointmentId,
  open,
  onOpenChange,
}: Props) {
  const pathname = "/user/" + userId + "/appointments";
  const { setOpen } = useUsers();
  const [isPending, setIspending] = useState(false);
  const route = useRouter();
  const handleDelete = async () => {
    await deleteAppointment(appointmentId, pathname);
    onOpenChange(false);
    toast({
      title: "The following appointment has been marked as missed:",
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
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-gray-600 flex flex-row items-center gap-2">
            <IconAlertTriangle /> Missed Appointment
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="-mr-4 w-full py-1 pr-4">
          <div className="space-y-4">
            <p className="mb-2 font-thin text-sm text-gray-900">
              Are you sure you want to mark this appointment entry as{" "}
              <b>MISSED</b>?
              <br />
            </p>
          </div>
        </ScrollArea>
        <div className="flex gap-2 justify-center">
          <Button
            type="button"
            onClick={() => setOpen("")}
            className="w-[120px] border text-black hover:bg-gray-200 bg-white-500"
          >
            Close
          </Button>

          {isPending ? (
            <Button
              type="button"
              className="w-[120px] hover:bg-red-500 bg-red-500"
            >
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button
              onClick={async () => {
                setIspending(true);
                await missedAppointment(appointmentId, pathname);
                route.push(pathname);
              }}
              className="bg-red-500 text-white hover:bg-red-600"
              type="button"
              form="user-form"
            >
              Submit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
