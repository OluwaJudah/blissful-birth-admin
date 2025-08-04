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
import { LoaderCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUsers } from "./context/users-context";
import SelectInput from "@/components/ui/select-input";
import ValidatedInput from "@/components/ui/validated-input";
import { updateMotherInfo } from "@/actions/mother-info";
import { UpdateMotherInfoFormSchema } from "@/definitions/mother-info";
import { updateMotherInfoFormSchema } from "@/definitions/mother-info";
import { packageTypeOptions, updateMotherInfoFormData } from "@/constants/motherinfo";

interface Props {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  age: number;
  g: number;
  p: number;
  packageType: string;
}

const initialState = {
  success: "",
  errors: {},
};

export function EditProfileDialog({ userId, open, onOpenChange, age, g, p, packageType }: Props) {
  const { setOpen } = useUsers();
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const updateMotherInfoWithUserId = updateMotherInfo.bind(
    null,
    userId,
    pathname
  );

  const [state, formAction, isPending] = useActionState(
    updateMotherInfoWithUserId,
    initialState
  );

  const form = useForm<UpdateMotherInfoFormSchema>({
    resolver: zodResolver(updateMotherInfoFormSchema),
    defaultValues: { g, p, packageType, age },
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
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Edit the profile for patient. Click save when you&apos;re done.
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
              {updateMotherInfoFormData.map((data) => (
                <ValidatedInput
                  key={data.name}
                  name={data.name}
                  label={data.label}
                  type={data.type}
                  placeholder={data.placeholder}
                  form={form}
                />
              ))}

              <SelectInput
                name="packageType"
                label="Package Type"
                placeholder="Package (Antenatal / Full Package)"
                options={packageTypeOptions}
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
