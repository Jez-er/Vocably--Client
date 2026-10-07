import type * as React from "react";

export type TextFieldProps = Omit<React.ComponentProps<"input">, "className"> & {
  /** Required: ties the <label> and the aria-describedby ids together. */
  id: string;
  label: string;
  error?: string;
  hint?: string;
  /** Rendered inside the field box, against its right edge. */
  trailing?: React.ReactNode;
  /** Wrapper layout only — the input's own styling is not overridable. */
  className?: string;
};

/** PasswordField owns both: it is always a password, and the eye toggle is the trailing slot. */
export type PasswordFieldProps = Omit<TextFieldProps, "type" | "trailing">;
