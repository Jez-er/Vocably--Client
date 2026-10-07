export type AuthCardProps = {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <section className="w-full max-w-[480px] rounded-card border border-border bg-surface px-6 py-10 sm:px-10 compact:py-6">
      <header className="flex flex-col gap-1.5">
        {/* H2 type style from the guide, <h1> semantics: one per page. */}
        <h1 className="font-serif text-[26px] font-semibold leading-tight sm:text-[30px]">
          {title}
        </h1>
        {subtitle && <p className="text-base text-muted-foreground">{subtitle}</p>}
      </header>

      <div className="mt-7 compact:mt-5">{children}</div>

      {footer && (
        <div className="mt-6 text-center text-[15px] text-muted-foreground compact:mt-3">{footer}</div>
      )}
    </section>
  );
}
