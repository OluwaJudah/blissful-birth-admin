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
import { useUsers } from "./context/users-context";
import { usePathname } from "next/navigation";
import { scanInputForm, scanTextAreaForm } from "@/constants/motherinfo";
import ValidatedInput from "@/components/ui/validated-input";
import ValidatedTextArea from "@/components/ui/validated-text-area";
import {
  IScan,
  ScanFormSchema,
  scanFormSchema,
} from "@/definitions/motherinfo";
import { createScan } from "@/actions/scan";

interface Props {
  userId: string;
  currentRow?: IScan;
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
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const isEdit = !!currentRow;
  const createScanWithUserId = createScan.bind(
    null,
    userId,
    pathname,
    isEdit ? currentRow.id! : ""
  );

  const [state, formAction, isPending] = useActionState(
    createScanWithUserId,
    initialState
  );

  const form = useForm<ScanFormSchema>({
    resolver: zodResolver(scanFormSchema),
    defaultValues: isEdit
      ? {
          date: currentRow?.date
            ? new Date(currentRow.date).toISOString().split("T")[0]
            : "",
          gestational_age: currentRow?.gestational_age || 0,
          scan_gestation: currentRow?.scan_gestation || "",
          outcome: currentRow?.outcome || "",
          warning: currentRow?.warning || "",
        }
      : {
          date: "",
          gestational_age: 0,
          scan_gestation: "",
          outcome: "",
          warning: "",
        },
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
              {scanInputForm.map((data) => (
                <ValidatedInput
                  key={data.name}
                  name={data.name}
                  label={data.label}
                  type={data.type}
                  placeholder={data.placeholder}
                  form={form}
                />
              ))}

              {scanTextAreaForm.map((data) => (
                <ValidatedTextArea
                  key={data.name}
                  name={data.name}
                  label={data.label}
                  placeholder={data.placeholder}
                  form={form}
                />
              ))}
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
