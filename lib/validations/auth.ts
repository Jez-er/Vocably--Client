import { z } from "zod";

const email = z.email("Enter a valid email address.");

const password = z
  .string()
  .min(8, "Use at least 8 characters.")
  .max(20, "Use 20 characters or fewer.");

export const loginSchema = z.object({ email, password });

export const registerSchema = z.object({
  email,
  displayName: z
    .string()
    .min(2, "Use at least 2 characters.")
    .max(16, "Use 16 characters or fewer."),
  password,
});

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z
  .object({
    password,
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
