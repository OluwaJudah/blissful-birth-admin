"use client";
import { Form } from "@/components/ui/form";
import { generateAppointments } from "@/actions/appointment";
import {
  generateAppointmentsFormSchema,
  GenerateAppointmentsFormSchema,
} from "@/definitions/appointment";
import { LoaderCircle } from "lucide-react";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ValidatedInput from "@/components/ui/validated-input";

const initialState = {
  success: "",
  errors: {},
};

const FirstAppointmentForm = ({
  userId,
  edd,
}: {
  userId: string;
  edd: string;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = `/user/settings/${userId}/appointments`;
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
      edd,
    },
  });

  const today = new Date();
  const fortyWeeksLater = new Date();
  fortyWeeksLater.setDate(today.getDate() + 40 * 7); // 40 weeks = 280 days
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return (
    <div className="flex flex-col gap-3">
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
          <ValidatedInput
            name="edd"
            label="Expected Due Date"
            type="date"
            placeholder=""
            form={form}
            min={formatDate(today)}
            max={formatDate(fortyWeeksLater)}
            classInput="col-span-4 flex flex-col justify-center"
          />
        </form>
      </Form>
      <div className="flex justify-center">
        {edd ? (
          <Button type="button" disabled={true} form="user-form">
            Generate Appointments
          </Button>
        ) : (
          <>
            {isPending ? (
              <Button type="button" className="w-[120px] bg-gray-500">
                <LoaderCircle className="animate-spin" />
              </Button>
            ) : (
              <Button type="submit" form="user-form">
                Generate Appointments
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FirstAppointmentForm;
