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
  min?: string;
  classLabel?: string;
  classInput?: string;
  classForm?: string;
}) => {
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
              min={min ? min : ""}
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
