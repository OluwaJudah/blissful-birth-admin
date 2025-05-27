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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClientPackage } from "@/actions/mother-info";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const ClientPackage = ({
  motherId,
  packageType,
}: {
  motherId: string;
  packageType: string;
}) => {
  const [isPending, setIsPending] = useState(false);
  const packageFormSchema = z.object({
    packageType: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
  });

  type PackageFormValues = z.infer<typeof packageFormSchema>;

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: { packageType },
  });

  const handleStringToInt = async (value: string) => {
    try {
      setIsPending(true);
      await updateClientPackage(value, motherId);
      toast({
        description:
          "Success!! You've updated the Mother's Report successfully.",
      });
      setIsPending(false);
    } catch (err) {
      console.log("Error updating mother info");
      throw Error("Error updating mother info");
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="packageType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package (Antenatal / Full Package)</FormLabel>
                <div className="flex gap-3 items-center">
                  <Select
                    onValueChange={handleStringToInt}
                    defaultValue={packageType}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a package for client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="anc">Antenatal Care</SelectItem>
                      <SelectItem value="full">Full Package</SelectItem>
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

export default ClientPackage;
