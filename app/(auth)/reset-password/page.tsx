import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "../_widgets/auth-card";
import {
  buttonBaseClass,
  buttonSizeClass,
  buttonVariantClass,
} from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";
import { ResetPasswordForm } from "./_widgets/reset-password-form";

export const metadata: Metadata = {
  title: "Choose a new password",
  description: "Set a new password for your Vocably account.",
};

export default async function ResetPasswordPage({
  searchParams,
}: PageProps<"/reset-password">) {
  const { token } = await searchParams;
  const raw = Array.isArray(token) ? token[0] : token;
  const resetToken = raw?.trim() ? raw : undefined;

  if (!resetToken) {
    return (
      <AuthCard
        title="This link has expired"
        subtitle="Reset links can only be used once. Ask for a new one to continue."
      >
        <Link
          href="/forgot-password"
          className={cn(
            buttonBaseClass,
            buttonVariantClass.primary,
            buttonSizeClass.md,
            "w-full",
          )}
        >
          Request a new link
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Choose a new password"
      subtitle="Pick something you will remember."
      footer={
        <TextLink href="/login" className="py-2">
          Back to log in
        </TextLink>
      }
    >
      <ResetPasswordForm token={resetToken} />
    </AuthCard>
  );
}
