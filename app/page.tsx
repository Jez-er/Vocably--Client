import Link from "next/link";
import { Logo } from "@/components/logo";
import { buttonBaseClass, buttonVariantClass } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-20 text-center sm:px-6 compact:gap-6 compact:py-10">
      <Logo />

      <div className="flex max-w-md flex-col gap-3">
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">
          Water your garden
        </h1>
        <p className="text-base text-muted">
          Plant your first word and keep growing your vocabulary garden.
        </p>
      </div>

      <Link
        href="/login"
        className={cn(buttonBaseClass, buttonVariantClass.primary)}
      >
        Start practice
      </Link>
    </main>
  );
}
