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
import {
  createNotificationFormSchema,
  CreateNotificationFormSchema,
} from "@/definitions/appointment";
import { LoaderCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUsers } from "./context/users-context";
import ValidatedInput from "@/components/ui/validated-input";
import ValidatedTextArea from "@/components/ui/validated-text-area";
import { createNotification } from "@/actions/notifications";

interface Props {
  currentRow?: User;
  userId: string;
  appointmentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialState = {
  success: "",
  errors: {},
};

export function CreateNotificationActionDialog({
  userId,
  appointmentId,
  open,
  onOpenChange,
}: Props) {
  const { setOpen } = useUsers();
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const createNotificationWithUserId = createNotification.bind(
    null,
    userId,
    appointmentId,
    pathname
  );

  const [state, formAction, isPending] = useActionState(
    createNotificationWithUserId,
    initialState
  );

  const form = useForm<CreateNotificationFormSchema>({
    resolver: zodResolver(createNotificationFormSchema),
    defaultValues: { to: "", message: "" },
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
          <DialogTitle>Send Notification</DialogTitle>
          <DialogDescription>
            Send a notification to the patient. Click send when you&apos;re
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
                name="to"
                label="To:"
                type="text"
                placeholder="Please enter the phone number"
                form={form}
                min="1"
                classInput="col-span-4 flex flex-col justify-center"
              />

              <ValidatedTextArea
                name="message"
                label="Message"
                placeholder="Please enter the message"
                form={form}
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
