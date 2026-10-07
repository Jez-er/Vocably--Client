"use client"

/**
 * shadcn's Dialog, restyled to style-quide.md §5.
 *
 * This replaced a native <dialog> + showModal() implementation. Radix covers what the platform
 * was giving for free — top layer, focus trap, Escape, focus restoration, an outside-press guard
 * that ignores a drag-select released outside, and unmounting the content when closed (which is
 * what resets react-hook-form and mutation state between opens).
 *
 * `showCloseButton` defaults to false here, inverting shadcn. The X would be the first tabbable
 * element in the dialog and would take the initial focus that belongs to the first field, and
 * every dialog in this app has an explicit Cancel in its actions row.
 *
 * Focus restoration on close is the one thing Radix does NOT cover here. It restores focus to a
 * DialogTrigger, but these dialogs are driven by external state — the add-dictionary one is
 * opened from two different buttons — so there is no trigger to go back to and focus lands on
 * <body>, putting a keyboard user back at the top of the page. The tracker below closes that gap
 * for Escape and for an in-dialog close button, which are the keyboard paths.
 *
 * Dismissing by pressing the backdrop still leaves focus on <body>: Radix deliberately does not
 * pull focus back after a pointer press outside, since the user may have been reaching for
 * something else, and overriding that would make focus fight the click. The native <dialog> did
 * restore here, so this is a real if minor difference.
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Dialog as DialogPrimitive } from "radix-ui"

import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

/**
 * The last element focused outside any dialog — i.e. the thing to put focus back on when one
 * closes.
 *
 * Tracked continuously rather than snapshotted when the content mounts: that mount is not tied
 * to the click that opened the dialog, so a render-time or effect-time snapshot reads whatever
 * happens to be focused at mount, which is already the first field inside the dialog.
 *
 * Module-scoped rather than passed through context, because the listener watches `document` and
 * so needs no per-dialog state, and because a single module-level value cannot be desynchronised
 * from the component that reads it.
 */
let lastFocusedOutsideDialog: HTMLElement | null = null

function trackFocusOutsideDialogs() {
  const onFocusIn = (event: FocusEvent) => {
    const target = event.target as HTMLElement | null
    // Every dialog part is excluded, not just the content: a backdrop press focuses the overlay,
    // which is then unmounted, and tracking it would leave nothing to restore to.
    if (target && !target.closest?.('[data-slot^="dialog-"]')) {
      lastFocusedOutsideDialog = target
    }
  }

  document.addEventListener("focusin", onFocusIn, true)
  return () => document.removeEventListener("focusin", onFocusIn, true)
}

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  // Mounted with the page, long before any dialog opens.
  React.useEffect(trackFocusOutsideDialogs, [])

  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-foreground/45 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = false,
  onCloseAutoFocus,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        onCloseAutoFocus={(event) => {
          onCloseAutoFocus?.(event)
          if (event.defaultPrevented) return
          const target = lastFocusedOutsideDialog
          if (!target?.isConnected) return
          event.preventDefault()
          target.focus()
        }}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-4rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-y-auto rounded-card border border-border bg-popover px-6 py-8 text-base text-popover-foreground duration-100 outline-none sm:max-w-[480px] sm:px-8 compact:gap-4 compact:py-6 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-4 right-4"
              size="icon"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        // §4: H3-ish, Lora 600. Dialog titles are headings, not UI labels.
        "font-serif text-[26px] leading-tight font-semibold",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-base text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
