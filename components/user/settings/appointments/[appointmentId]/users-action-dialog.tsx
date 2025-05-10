"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { startTransition, useActionState, useRef } from "react";
import { User } from "./data/schema";
import { rescheduleAppointment } from "@/actions/appointment";
import {
  rescheduleAppointmentFormSchema,
  RescheduleAppointmentFormSchema,
} from "@/definitions/appointment";
import { LoaderCircle } from "lucide-react";
import { timeSlotOptions } from "@/constants/appointment";
import SelectInput from "@/components/ui/select-input";
import ValidatedInput from "@/components/ui/validated-input";
import { useUsers } from "./context/users-context";

interface Props {
  appointmentId: string;
  currentRow?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialState = {
  success: "",
  errors: {},
};

export function UsersActionDialog({
  appointmentId,
  open,
  onOpenChange,
}: Props) {
  const { setOpen } = useUsers();
  const formRef = useRef<HTMLFormElement>(null);
  const rescheduleAppointmentWithAppointmentId = rescheduleAppointment.bind(
    null,
    appointmentId
  );
  const [state, formAction, isPending] = useActionState(
    rescheduleAppointmentWithAppointmentId,
    initialState
  );

  const form = useForm<RescheduleAppointmentFormSchema>({
    resolver: zodResolver(rescheduleAppointmentFormSchema),
    defaultValues: {
      date: "",
    },
  });
  const minDate = new Date();
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>Reschedule Appointments</DialogTitle>
          <DialogDescription>
            Reschedule date for this appointment. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mr-4 w-full py-1 pr-4">
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={(evt) => {
                evt.preventDefault();
                form.handleSubmit(() => {
                  const formData = new FormData(formRef.current!);
                  startTransition(() => {
                    formAction(formData);
                    setOpen("");
                  });
                })(evt);
              }}
              id="user-form"
              className="space-y-4 p-0.5"
            >
              <ValidatedInput
                name="date"
                label="Rescheduled Date"
                type="date"
                placeholder=""
                form={form}
                min={formatDate(minDate)}
                classInput="col-span-4 flex flex-col justify-center"
              />

              <SelectInput
                name="time"
                label="Reschedule Time"
                placeholder="Please select an available time slot"
                options={timeSlotOptions}
                {...{
                  form,
                  isPending,
                }}
              />
            </form>
          </Form>
        </ScrollArea>
        <div className="flex justify-center">
          {isPending ? (
            <Button type="button" className="w-[120px] bg-gray-500">
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit" form="user-form">
              Save changes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
