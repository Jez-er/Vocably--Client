import type * as React from "react";

export type TextFieldProps = Omit<React.ComponentProps<"input">, "className"> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  trailing?: React.ReactNode;
  className?: string;
};

export type PasswordFieldProps = Omit<TextFieldProps, "type" | "trailing">;
