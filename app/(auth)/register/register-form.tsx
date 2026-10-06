"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoogleButton } from "@/components/auth/google-button";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { OrDivider } from "@/components/ui/or-divider";
import { PasswordField } from "@/components/ui/password-field";
import { TextField } from "@/components/ui/text-field";
import { applyFieldErrors, resolveAuthErrorMessage, useRegister } from "@/lib/api";
import { registerSchema, type RegisterValues } from "@/lib/validations/auth";

const FIELDS = ["email", "displayName", "password"] as const;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", displayName: "", password: "" },
  });

  const { mutate, isPending, error } = useRegister();

  const onSubmit = (values: RegisterValues) =>
    mutate(values, {
      onError: (cause) => {
        applyFieldErrors(cause, setError, FIELDS);
      },
    });

  return (
    <div className="flex flex-col gap-6 compact:gap-4">
      <FormError
        message={error ? resolveAuthErrorMessage(error, "register") : null}
      />
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 compact:gap-3.5"
      >
        <TextField
          id="register-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          id="register-display-name"
          label="Display name"
          autoComplete="nickname"
          hint="2 to 16 characters"
          error={errors.displayName?.message}
          {...register("displayName")}
        />
        <PasswordField
          id="register-password"
          label="Password"
          autoComplete="new-password"
          hint="8 to 20 characters"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <OrDivider />
      <GoogleButton />
    </div>
  );
}
