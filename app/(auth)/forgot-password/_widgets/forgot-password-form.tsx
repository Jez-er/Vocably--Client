"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthCard } from "../../_widgets/auth-card";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { TextLink } from "@/components/ui/text-link";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/validations/auth";

export function ForgotPasswordForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setSentTo(values.email);
  };

  if (sentTo) {
    return (
      <AuthCard
        title="Check your email"
        subtitle={
          <>
            We sent a reset link to{" "}
            <span className="font-medium text-foreground">{sentTo}</span>.
          </>
        }
        footer={
          <TextLink href="/login" className="py-2">
            Back to log in
          </TextLink>
        }
      >
        <div role="status" className="flex flex-col gap-5 compact:gap-3.5">
          <p className="text-base text-muted">
            Nothing in your inbox? Give it a minute, then check your spam
            folder.
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setSentTo(null)}
          >
            Send another link
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email and we will send you a link."
      footer={
        <TextLink href="/login" className="py-2">
          Back to log in
        </TextLink>
      }
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 compact:gap-3.5"
      >
        <TextField
          id="forgot-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Send reset link
        </Button>
      </form>
    </AuthCard>
  );
}
