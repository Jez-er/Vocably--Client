import Link from "next/link";
import { Logo } from "@/components/logo";

// LayoutProps<"/"> and not <"/(auth)">: route groups are stripped from the path.
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-13 px-4 py-16 sm:px-6 compact:gap-5 compact:py-4">
      <Link
        href="/"
        aria-label="Vocably home"
        className="rounded-field focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Logo size="auth" />
      </Link>
      {children}
    </main>
  );
}
