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
import { Textarea } from "@/components/ui/textarea";
import {
  IMotherReport,
  motherReportFormSchema,
  MotherReportFormSchema,
} from "@/definitions/appointment";
import ValidatedInput from "@/components/ui/validated-input";
import {
  motherReportFormData,
  motherReportOtherFormData,
  motherReportSelectFormData,
  urineOptions,
} from "@/constants/appointment";
import { startTransition, useActionState, useRef } from "react";
import { submitMotherReport } from "@/actions/appointment";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { LoaderCircle } from "lucide-react";
import SelectInput from "@/components/ui/select-input";

export function MotherReportForm({
  appointmentId,
  motherReport,
}: {
  appointmentId: string;
  motherReport: IMotherReport | undefined;
}) {
  const initialState = {
    message: "",
    errors: {},
  };
  const pathname = usePathname();

  const submitMotherReportWithAppointmentId = submitMotherReport.bind(
    null,
    appointmentId,
    pathname
  );

  const [state, formAction, isPending] = useActionState(
    submitMotherReportWithAppointmentId,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<MotherReportFormSchema>({
    resolver: zodResolver(motherReportFormSchema),
    defaultValues: motherReport,
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
                    "Success!! You've updated the Mother's Report successfully.",
                });
              });
            })(evt);
          }}
          className="space-y-8"
        >
          {motherReportFormData.map((data) => (
            <ValidatedInput
              key={data.name}
              name={data.name}
              label={data.label}
              type={data.type}
              placeholder={data.placeholder}
              form={form}
            />
          ))}

          {motherReportSelectFormData.map(({ name, label, placeholder }) => (
            <SelectInput
              key={name}
              {...{
                name,
                label,
                form,
                isPending,
                options: urineOptions,
                placeholder,
              }}
            />
          ))}

          {motherReportOtherFormData.map((data) => (
            <ValidatedInput
              key={data.name}
              name={data.name}
              label={data.label}
              type={data.type}
              placeholder={data.placeholder}
              form={form}
            />
          ))}

          <FormField
            control={form.control}
            name="motherNote"
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
