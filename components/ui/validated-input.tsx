import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ValidatedInput = ({
  name,
  label,
  type,
  form,
  placeholder,
  min,
}: {
  name: string;
  form: any;
  label: string;
  type?: string;
  placeholder?: string;
  min?: number;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type ? type : ""}
              min={min ? min : 0}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ValidatedInput;
