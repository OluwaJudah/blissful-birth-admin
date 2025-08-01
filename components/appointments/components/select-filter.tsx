"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const SelectFilter = ({
  appointments,
  filterByStatus,
}: {
  appointments: any;
  filterByStatus: (data: any[], status: string) => void;
}) => {
  const [status, setStatus] = useState("pending");
  const [isPending, setIsPending] = useState(false);
  const packageFormSchema = z.object({
    status: z.string().min(2, {
      message: "Status must be at least 2 characters.",
    }),
  });

  type SelectFilterValues = z.infer<typeof packageFormSchema>;

  const form = useForm<SelectFilterValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: { status },
  });

  const handleStringToInt = async (value: string) => {
    try {
      setStatus(value);
      onChangeFilterStatus(value.toLowerCase());
    } catch (err) {
      console.log("Error updating mother info");
      throw Error("Error updating mother info");
    }
  };

  const onChangeFilterStatus = async (status: string) => {
    filterByStatus(appointments, status.toLowerCase());
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-3 items-center">
                  <Select
                    onValueChange={handleStringToInt}
                    defaultValue={status}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  {isPending && <LoaderCircle className="animate-spin" />}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Toaster />
    </>
  );
};

export default SelectFilter;
