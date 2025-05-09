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
                  });
                })(evt);
              }}
              id="user-form"
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Rescheduled Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g 1000"
                        className="col-span-4 flex flex-col justify-center"
                        autoComplete="off"
                        type="date"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
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
