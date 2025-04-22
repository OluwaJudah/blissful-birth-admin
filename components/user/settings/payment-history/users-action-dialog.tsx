"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectDropdown } from "@/components/select-dropdown";
import { userTypes } from "./data/data";
import { User } from "./data/schema";
import { startTransition, useActionState, useRef } from "react";
import { createPaymentEntry } from "@/actions/payment-history";
import { useFormState } from "react-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsers } from "./context/users-context";
import { useParams, usePathname } from "next/navigation";

const formSchema = z.object({
  type: z.string().min(1, { message: "Payment Type 11 is required." }),
  amount: z.coerce.number().positive(), // Ensures it's a positive float
  isEdit: z.boolean(),
});
type UserForm = z.infer<typeof formSchema>;

interface Props {
  userId: string;
  currentRow?: User;
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
  const pathname = usePathname();
  const isEdit = !!currentRow;
  const formRef = useRef<HTMLFormElement>(null);

  const createPaymentEntryWithUserId = createPaymentEntry.bind(
    null,
    userId,
    pathname
  );
  const [state, formAction, isPending] = useActionState(
    createPaymentEntryWithUserId,
    initialState
  );

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          type: "",
          amount: 0,
          isEdit,
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
            {isEdit ? "Edit Payment Entry" : "Add New Payment"}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the client here. " : "Create new payment here. "}
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
                    form.reset();
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
                name="type"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Payment Type
                    </FormLabel>
                    <div className="col-span-4">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                        {...field}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a payment Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {userTypes.map(({ label, value }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g 1000"
                        className="col-span-4"
                        autoComplete="off"
                        type="number"
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
          <Button type="submit" form="user-form" disabled={isPending}>
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
