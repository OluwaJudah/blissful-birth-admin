import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SelectInput = ({
  name,
  label,
  isPending,
  options,
  placeholder,
  form,
}: {
  name: string;
  label: string;
  isPending: boolean;
  options: { label: string; value: any }[];
  placeholder?: string;
  form: any;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isPending}
            {...field}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder ? placeholder : ""} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="col-span-4 col-start-3" />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
