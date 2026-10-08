import type { FormErrorProps } from "@/types/ui/form-error";

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="rounded-field border border-danger/40 bg-danger/5 px-[18px] py-3 text-[15px] font-medium text-danger"
    >
      {message}
    </p>
  );
}
