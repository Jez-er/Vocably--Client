import type { Metadata } from "next";
import { AuthCard } from "../_widgets/auth-card";
import { TextLink } from "@/components/ui/text-link";
import { RegisterForm } from "./_widgets/register-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Start your Vocably vocabulary garden.",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Plant your first word"
      subtitle="Create an account and start your vocabulary garden."
      footer={
        <>
          Already growing? <TextLink href="/login">Log In</TextLink>
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
