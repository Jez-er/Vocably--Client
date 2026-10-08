"use client";

import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { LanguageComboboxProps } from "@/types/dictionaries";

export function LanguageCombobox({
  id,
  label,
  languages,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}: LanguageComboboxProps) {
  const [open, setOpen] = useState(false);
  const errorId = `${id}-error`;
  const selected = languages.find((language) => language.code === value);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          onBlur={onBlur}
          className="flex h-[52px] w-full items-center justify-between gap-3 rounded-field border border-border bg-surface-input px-[18px] text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-danger"
        >
          <span className={cn(!selected && "text-placeholder")}>
            {selected ? (
              <>
                {selected.flag && (
                  <span aria-hidden="true">{selected.flag} </span>
                )}
                {selected.title}
              </>
            ) : (
              "Choose a language"
            )}
          </span>
          <ChevronsUpDown
            aria-hidden="true"
            className="size-5 shrink-0 text-muted-foreground"
          />
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) p-0"
        >
          <Command>
            <CommandInput placeholder="Search languages…" />
            <CommandList>
              <CommandEmpty>No language matches that.</CommandEmpty>
              {languages.map((language) => (
                <CommandItem
                  key={language.code}
                  value={language.title}
                  data-checked={language.code === value}
                  onSelect={() => {
                    onChange(language.code);
                    setOpen(false);
                  }}
                >
                  {language.flag && <span aria-hidden="true">{language.flag}</span>}
                  {language.title}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <p id={errorId} className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
