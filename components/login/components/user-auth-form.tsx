"use client";
import {
  HTMLAttributes,
  startTransition,
  useActionState,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import Link from "next/link";
import { loginUser } from "@/actions/auth";
import { LoginUserForm, loginUserformSchema } from "@/definitions/auth";

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const initialState = {
    message: "",
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState
  );

  const form = useForm<LoginUserForm>({
    resolver: zodResolver(loginUserformSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(() => {
              setIsLoading(true);
              const formData = new FormData(formRef.current!);
              startTransition(() => {
                formAction(formData);
              });
              setIsLoading(false);
            })(evt);
          }}
        >
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-muted-foreground hover:opacity-75"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="my-2" disabled={isLoading}>
              Login
            </Button>
            <div className="text-center text-red-500">
              {state?.errors && (
                <span className="text-pinklet-500">
                  {state?.errors["username"]}
                </span>
              )}
              {state?.errors && (
                <span className="text-pinklet-500">
                  {state?.errors["password"]}
                </span>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
