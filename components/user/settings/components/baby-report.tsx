"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BabyReportFormSchema,
  babyReportFormSchema,
  IBabyReport,
} from "@/definitions/appointment";
import {
  babyReportFormData,
  babyReportSelectFormData,
} from "@/constants/appointment";
import ValidatedInput from "@/components/ui/validated-input";
import { startTransition, useActionState, useRef } from "react";
import { usePathname } from "next/navigation";
import { submitBabyReport } from "@/actions/appointment";
import { Toaster } from "@/components/ui/toaster";
import { LoaderCircle } from "lucide-react";
import SelectInput from "@/components/ui/select-input";

// This can come from your database or API.
export function BabyReportForm({
  appointmentId,
  babyReport,
}: {
  appointmentId: string;
  babyReport: IBabyReport | undefined;
}) {
  const initialState = {
    message: "",
    errors: {},
  };
  const pathname = usePathname();

  const submitBabyReportWithAppointmentId = submitBabyReport.bind(
    null,
    appointmentId,
    pathname
  );

  const [state, formAction, isPending] = useActionState(
    submitBabyReportWithAppointmentId,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<BabyReportFormSchema>({
    resolver: zodResolver(babyReportFormSchema),
    defaultValues: babyReport,
  });

  const { handleSubmit } = form;

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();

            handleSubmit(() => {
              const formData = new FormData(formRef.current!);
              startTransition(() => {
                formAction(formData);
                toast({
                  description:
                    "Success!! You've updated the Baby's Report successfully.",
                });
              });
            })(evt);
          }}
          className="space-y-8"
        >
          {babyReportFormData.map((data) => (
            <ValidatedInput
              key={data.name}
              name={data.name}
              label={data.label}
              type={data.type}
              placeholder={data.placeholder}
              form={form}
            />
          ))}

          {babyReportSelectFormData.map(
            ({ name, label, options, placeholder }) => (
              <SelectInput
                key={name}
                {...{
                  name,
                  label,
                  form,
                  isPending,
                  options,
                  placeholder,
                }}
              />
            )
          )}

          <FormField
            control={form.control}
            name="babyNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extra Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here."
                    id="message-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-[80px] mx-auto">
            {isPending ? (
              <Button className="bg-gray-500 w-[78px]" type="button">
                <LoaderCircle className="animate-spin" />
              </Button>
            ) : (
              <Button className="bg-gray-900" type="submit">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
