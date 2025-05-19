"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ValidatedTextArea from "@/components/ui/validated-text-area";
import {
  bloodInputFormData,
  bloodResultsSelectFormData,
} from "@/constants/motherinfo";
import {
  BloodResultsFormSchema,
  bloodResultsFormSchema,
} from "@/definitions/motherinfo";
import { usePathname } from "next/navigation";
import { startTransition, useActionState, useRef, useState } from "react";
import { updateBloodResults } from "@/actions/motherinfo";
import { LoaderCircle } from "lucide-react";
import SelectInput from "@/components/ui/select-input";
import ValidatedInput from "@/components/ui/validated-input";
import { IBloodResult } from "@/definitions/mother-info";
import { Toaster } from "@/components/ui/toaster";

// This can come from your database or API.
export function BloodResultsForm({
  bloodResult,
  userId,
}: {
  bloodResult: IBloodResult;
  userId: string;
}) {
  const initialState = {
    message: "",
    errors: {},
  };
  const pathname = usePathname();

  const updateBloodResultsWithUserId = updateBloodResults.bind(
    null,
    userId,
    pathname
  );

  const [state, formAction, isPending] = useActionState(
    updateBloodResultsWithUserId,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<BloodResultsFormSchema>({
    resolver: zodResolver(bloodResultsFormSchema),
    defaultValues: {
      ...bloodResult,
      date: bloodResult.date?.toISOString().split("T")[0],
    },
  });

  const { handleSubmit } = form;
  const options = [
    { label: "Positive", value: "Positive" },
    { label: "Negative", value: "Negative" },
  ];

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
                    "Success!! You've updated the Blood Result's Report successfully.",
                });
              });
            })(evt);
          }}
          className="space-y-2"
        >
          <ValidatedInput
            label="Date"
            name="date"
            type="date"
            placeholder=""
            form={form}
            classInput="col-span-4 flex flex-col justify-center"
          />

          {bloodResultsSelectFormData.map(({ name, label, placeholder }) => (
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
          ))}

          {bloodInputFormData.map((data) => (
            <ValidatedInput
              key={data.name}
              name={data.name}
              label={data.label}
              type={data.type}
              placeholder={data.placeholder}
              form={form}
            />
          ))}

          <ValidatedTextArea
            name="notes"
            label="Notes"
            placeholder="Please enter extra notes here."
            form={form}
          />

          <div className="w-[78px] mx-auto">
            {isPending ? (
              <Button className="bg-gray-500 w-[78px]" type="button">
                <LoaderCircle className="animate-spin" />
              </Button>
            ) : (
              <Button className="bg-gray-900" type="submit">
                Update
              </Button>
            )}
          </div>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
