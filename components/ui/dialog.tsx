"use client";

import { useEffect, useId, useRef } from "react";

export type DialogProps = {
  open: boolean;
  /** Called after any native close — Escape, a backdrop click, or a caller closing it. */
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
};

/**
 * A modal dialog built on the native <dialog> element.
 *
 * showModal() gives top-layer stacking, `inert` on the rest of the document, a focus trap, Escape
 * and focus restoration — all from the platform. A portal would have to reimplement every one of
 * those by hand.
 *
 * There is no × close button on purpose: it would be the first tabbable element and steal the
 * initial focus that belongs to the first field, and the actions row already offers Cancel.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  // Whether the mousedown that started this click landed on the backdrop. Without it, selecting
  // text inside the dialog and releasing outside would read as a backdrop click and close it.
  const pressedBackdrop = useRef(false);

  // `open` cannot be a JSX prop: <dialog open> renders a *non-modal* dialog, with no backdrop, no
  // top layer, no focus trap and no Escape. There is no declarative equivalent of showModal().
  useEffect(() => {
    const dialog = ref.current;

    if (!dialog) return;
    // Guarded both ways: showModal() on an already-open dialog throws InvalidStateError.
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      // No role="dialog" and no aria-modal: a modal <dialog> carries both implicitly, and a manual
      // aria-modal on a top-layer element confuses some assistive technology.
      onClose={onClose}
      onMouseDown={(event) => {
        pressedBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (pressedBackdrop.current && event.target === event.currentTarget) {
          onClose();
        }
      }}
      // p-0 with a single inner wrapper is what makes a backdrop click identifiable: ::backdrop is
      // a pseudo-element and never an event target, so the padding-free dialog box itself is the
      // thing that gets clicked. The rest resets the UA stylesheet's margin, border and padding.
      className="m-auto max-h-[calc(100dvh-4rem)] w-[calc(100%-2rem)] max-w-[480px] overflow-y-auto rounded-card border border-border bg-surface p-0 text-foreground"
    >
      {/* Mounted only while open, so the form inside remounts fresh each time — which resets both
          react-hook-form state and any mutation error without an explicit reset() call. The
          <dialog> itself stays mounted, because native focus restoration needs the element to
          still be in the document when close() runs. */}
      {open && (
        <div className="flex flex-col gap-6 px-6 py-8 sm:px-8 compact:gap-4 compact:py-6">
          <div className="flex flex-col gap-1.5">
            <h2
              id={titleId}
              className="font-serif text-[26px] leading-tight font-semibold"
            >
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="text-base text-muted">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
