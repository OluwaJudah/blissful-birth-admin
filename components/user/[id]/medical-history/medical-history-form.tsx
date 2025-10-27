"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { conditions, familyHistory, tbSymptomsScreen } from "./constants";
import ValidatedTextArea from "@/components/ui/validated-text-area";
import { medicalHistoryFormData } from "@/constants/motherinfo";
import {
  MedicalHistoryFormSchema,
  medicalHistoryFormSchema,
} from "@/definitions/motherinfo";
import { usePathname } from "next/navigation";
import { startTransition, useActionState, useRef, useState } from "react";
import { updateMedicalReport } from "@/actions/motherinfo";
import Selectables, { SelectableType } from "./selectables";
import { LoaderCircle } from "lucide-react";
import { IMedicalHistory } from "@/definitions/mother-info";
import { Toaster } from "@/components/ui/toaster";

// This can come from your database or API.

export function MedicalHistoryForm({
  medicalHistory,
  userId,
}: {
  medicalHistory: IMedicalHistory;
  userId: string;
}) {
  const initialState = {
    message: "",
    errors: {},
  };
  const pathname = usePathname();

  const updateSelectablesArray = (
    selectableArray: SelectableType[],
    selectableString: string
  ) => {
    const selectableStringArray = selectableString.split(",");
    const updatedSelectableArray = selectableArray.map((s) => {
      if (selectableStringArray.includes(s.name))
        return { name: s.name, isAdded: true };
      return s;
    });
    return updatedSelectableArray;
  };

  const [conditionList, setConditionList] = useState<SelectableType[]>(
    updateSelectablesArray(conditions, medicalHistory.conditions)
  );
  const [familyHistoryList, setFamilyHistoryList] = useState<SelectableType[]>(
    updateSelectablesArray(familyHistory, medicalHistory.familyHistory)
  );
  const [tbSymptomsScreenList, setTbSymptomsScreenList] = useState<
    SelectableType[]
  >(updateSelectablesArray(tbSymptomsScreen, medicalHistory.tbSymptomsScreen));

  const filterArraytoStr = (condition: SelectableType[]) =>
    condition
      .filter((c) => c.isAdded)
      .map((f) => f.name)
      .toString();

  const updateMedicalReportWithDetails = updateMedicalReport.bind(
    null,
    userId,
    filterArraytoStr(conditionList),
    filterArraytoStr(familyHistoryList),
    filterArraytoStr(tbSymptomsScreenList),
    pathname
  );

  const [state, formAction, isPending] = useActionState(
    updateMedicalReportWithDetails,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<MedicalHistoryFormSchema>({
    resolver: zodResolver(medicalHistoryFormSchema),
    defaultValues: medicalHistory,
  });

  const { handleSubmit } = form;

  return (
    <>
      {" "}
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
                    "Success!! You've updated the Medical History successfully.",
                });
              });
            })(evt);
          }}
          className="space-y-2"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <div className="text-sm font-medium leading-none">Conditions</div>
              <Selectables list={conditionList} setList={setConditionList} />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-medium leading-none">
                Family History
              </div>
              <Selectables
                list={familyHistoryList}
                setList={setFamilyHistoryList}
              />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-medium leading-none">
                TB Symptoms
              </div>
              <Selectables
                list={tbSymptomsScreenList}
                setList={setTbSymptomsScreenList}
              />
            </div>
          </div>
          {medicalHistoryFormData.map((data) => (
            <ValidatedTextArea
              key={data.name}
              name={data.name}
              label={data.label}
              placeholder={data.placeholder}
              form={form}
            />
          ))}
          <div className="w-[138px] mx-auto">
            {isPending ? (
              <Button className="bg-gray-500 w-[138px]" type="button">
                <LoaderCircle className="animate-spin" />
              </Button>
            ) : (
              <Button className="bg-gray-900" type="submit">
                Update account
              </Button>
            )}
          </div>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
