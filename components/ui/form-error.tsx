/**
 * Form-level API error. Renders nothing when there is no message, so a caller can pass a possibly
 * undefined value straight through.
 *
 * role="alert" so screen readers announce a failed submit the user did not scroll to.
 */
export function FormError({ message }: { message?: string | null }) {
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
