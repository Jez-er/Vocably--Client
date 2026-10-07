import type { Metadata } from "next";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "Request a link to reset your Vocably password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
