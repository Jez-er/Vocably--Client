"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoogleButton } from "@/components/auth/google-button";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { OrDivider } from "@/components/ui/or-divider";
import { PasswordField } from "@/components/ui/password-field";
import { TextField } from "@/components/ui/text-field";
import { TextLink } from "@/components/ui/text-link";
import { applyFieldErrors, resolveAuthErrorMessage, useLogin } from "@/shared/api";
import { loginSchema, type LoginValues } from "@/lib/validations/auth";

const FIELDS = ["email", "password"] as const;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending, error } = useLogin();

  const onSubmit = (values: LoginValues) =>
    mutate(values, {
      onError: (cause) => {
        applyFieldErrors(cause, setError, FIELDS);
      },
    });

  return (
    <div className="flex flex-col gap-6 compact:gap-4">
      <FormError message={error ? resolveAuthErrorMessage(error, "login") : null} />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 compact:gap-3.5"
      >
        <TextField
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <PasswordField
          id="login-password"
          label="Password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <div className="-mt-1 flex justify-end">
          <TextLink href="/forgot-password" className="py-2 text-[15px]">
            Forgot password?
          </TextLink>
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Logging in…" : "Log In"}
        </Button>
      </form>

      <OrDivider />
      <GoogleButton />
    </div>
  );
}
