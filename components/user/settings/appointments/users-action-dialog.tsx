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
import { generateAppointments } from "@/actions/appointment";
import {
  generateAppointmentsFormSchema,
  GenerateAppointmentsFormSchema,
} from "@/definitions/appointment";
import { LoaderCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUsers } from "./context/users-context";

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

export function UsersActionDialog({
  userId,
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const { setOpen } = useUsers();
  const isEdit = !!currentRow;
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const generateAppointmentsWithUserId = generateAppointments.bind(
    null,
    userId,
    pathname
  );

  const [state, formAction, isPending] = useActionState(
    generateAppointmentsWithUserId,
    initialState
  );

  const form = useForm<GenerateAppointmentsFormSchema>({
    resolver: zodResolver(generateAppointmentsFormSchema),
    defaultValues: {
      edd: "",
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
          <DialogTitle>
            {isEdit ? "Edit Payment Entry" : "Generate Appointments"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the client here. "
              : "Create all the appointments for patient. "}
            Click save when you&apos;re done.
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
              // onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="edd"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Expected Due Date
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
