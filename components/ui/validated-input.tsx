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
  classLabel,
  classInput,
  classForm,
}: {
  name: string;
  form: any;
  label: string;
  type?: string;
  placeholder?: string;
  min?: any;
  classLabel?: string;
  classInput?: string;
  classForm?: string;
}) => {
  let minValue = "";
  if (type === "number" && !min) minValue = "0";
  if (type === "number" && min) minValue = min;
  else if (min) minValue = min;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={classForm ? classForm : ""}>
          <FormLabel className={classLabel ? classLabel : ""}>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={type ? type : ""}
              min={minValue}
              placeholder={placeholder}
              {...field}
              className={classInput ? classInput : ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ValidatedInput;
