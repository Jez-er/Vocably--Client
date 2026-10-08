import type { Metadata } from "next";
import { AuthCard } from "../_widgets/auth-card";
import { TextLink } from "@/components/ui/text-link";
import { LoginForm } from "./_widgets/login-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Vocably garden.",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Water your garden"
      subtitle="Log in to keep your words growing."
      footer={
        <>
          New to Vocably? <TextLink href="/register">Create account</TextLink>
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
