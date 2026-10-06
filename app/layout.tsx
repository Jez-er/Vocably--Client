import type { Metadata } from "next";
import { Lora, Figtree } from "next/font/google";
import { SessionProvider } from "@/lib/api/auth/session-provider";
import { QueryProvider } from "@/lib/query/provider";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vocably",
  description: "Water your garden — a calm way to grow your vocabulary.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${figtree.variable} h-full antialiased`}
    >
      {/* The provider wraps children rather than <html>, so the static parts of the
          document stay outside the client boundary. */}
      <body className="min-h-full flex flex-col font-sans">
        <QueryProvider>
          <SessionProvider>{children}</SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
