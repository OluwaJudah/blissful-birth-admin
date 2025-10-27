"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrintAppointmentModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>Print Appointment</DialogTitle>
          <DialogDescription>
            Printing the appointment for the patient.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-2">
          <LoaderCircle className="animate-spin" size={24} />
          <p className="text-sm text-muted-foreground">
            Printing appointment...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
