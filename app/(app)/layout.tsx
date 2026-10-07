import { AppShell } from "./_widgets/app-shell";


export default function AppLayout({ children }: LayoutProps<"/">) {
  return <AppShell>{children}</AppShell>;
}
