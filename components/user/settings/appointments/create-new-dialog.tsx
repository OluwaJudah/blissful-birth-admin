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
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { startTransition, useActionState, useRef } from "react";
import { User } from "./data/schema";
import { createAppointment, generateAppointments } from "@/actions/appointment";
import {
  createAppointmentFormSchema,
  CreateAppointmentFormSchema,
} from "@/definitions/appointment";
import { LoaderCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUsers } from "./context/users-context";
import SelectInput from "@/components/ui/select-input";
import ValidatedInput from "@/components/ui/validated-input";
import { timeSlotOptions } from "@/constants/appointment";

interface Props {
  currentRow?: User;
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialState = {
  success: "",
  errors: {},
};

export function CreateNewActionDialog({
  userId,
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const { setOpen } = useUsers();
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const createAppointmentWithUserId = createAppointment.bind(
    null,
    userId,
    pathname
  );

  const [state, formAction, isPending] = useActionState(
    createAppointmentWithUserId,
    initialState
  );

  const form = useForm<CreateAppointmentFormSchema>({
    resolver: zodResolver(createAppointmentFormSchema),
    defaultValues: { pregnancyWeeks: 1, date: "", time: "" },
  });

  const today = new Date();
  const fortyWeeksLater = new Date();
  fortyWeeksLater.setDate(today.getDate() + 40 * 7); // 40 weeks = 280 days
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const minDate = new Date();

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
          <DialogTitle>Create Appointments</DialogTitle>
          <DialogDescription>
            Create new the appointments for patient. Click save when you&apos;re
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
                name="pregnancyWeeks"
                label="Pregnancy Week"
                type="number"
                placeholder="Please enter pregnancy weeks"
                form={form}
                min="1"
                classInput="col-span-4 flex flex-col justify-center"
              />

              <ValidatedInput
                name="date"
                label="Date"
                type="date"
                placeholder=""
                form={form}
                classInput="col-span-4 flex flex-col justify-center"
              />

              <SelectInput
                name="time"
                label="Time"
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
              Submit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
