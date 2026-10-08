"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/components/ui/password-field";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/lib/validations/auth";

export function ResetPasswordForm({ token }: { token: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    console.info("reset submit", {
      hasToken: Boolean(token),
      length: values.password.length,
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 compact:gap-3.5"
    >
      <PasswordField
        id="reset-password"
        label="New password"
        autoComplete="new-password"
        hint="8 to 20 characters"
        error={errors.password?.message}
        {...register("password")}
      />
      <PasswordField
        id="reset-confirm-password"
        label="Confirm new password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Save password
      </Button>
    </form>
  );
}
