"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateDictionaryForm } from "@/components/dictionaries/create-dictionary-form";
import { DictionaryCard } from "@/components/dictionaries/dictionary-card";
import { SproutIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FormError } from "@/components/ui/form-error";
import {
  isApiError,
  resolveDictionaryErrorMessage,
  useDictionaryCards,
} from "@/lib/api";

export function DictionariesView() {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const {
    cards,
    languages,
    isPending,
    error,
    refetch,
    languagesError,
    isLanguagesPending,
  } = useDictionaryCards();

  useEffect(() => {
    if (isApiError(error) && error.status === 401) router.replace("/login");
  }, [error, router]);

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-1.5">
          <p className="text-[13px] font-semibold tracking-[0.12em] text-muted uppercase">
            Your garden
          </p>
          <h1 className="font-serif text-[32px] leading-tight font-semibold sm:text-[38px]">
            Dictionaries
          </h1>
          <p className="text-base text-muted">
            Pick a language to tend, or plant a new one.
          </p>
        </div>
        {cards.length > 0 && (
          <Button onClick={() => setIsAdding(true)}>Add dictionary</Button>
        )}
      </header>

      {isPending ? (
        <PendingGrid />
      ) : error ? (
        <div className="mt-7 flex flex-col items-start gap-4 compact:mt-5">
          <FormError message={resolveDictionaryErrorMessage(error, "list")} />
          <Button variant="outline" onClick={refetch}>
            Try again
          </Button>
        </div>
      ) : cards.length === 0 ? (
        <EmptyState onAdd={() => setIsAdding(true)} />
      ) : (
        <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 compact:mt-5">
          {cards.map((card) => (
            <li key={card.id}>
              <DictionaryCard
                title={card.title}
                flag={card.flag}
                wordCount={card.wordCount}
              />
            </li>
          ))}
        </ul>
      )}

      <Dialog
        open={isAdding}
        onClose={() => setIsAdding(false)}
        title="Add a dictionary"
        description="Choose a language and start a new patch in your garden."
      >
        <CreateDictionaryForm
          languages={languages}
          isLanguagesPending={isLanguagesPending}
          languagesError={languagesError}
          onCancel={() => setIsAdding(false)}
          onCreated={() => setIsAdding(false)}
        />
      </Dialog>
    </>
  );
}

function PendingGrid() {
  return (
    <>
      <p role="status" className="sr-only">
        Loading your dictionaries
      </p>
      <ul
        aria-hidden="true"
        className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 compact:mt-5"
      >
        {[0, 1, 2].map((index) => (
          <li key={index}>
            <div className="flex h-[148px] flex-col justify-between rounded-stat border border-border bg-surface p-6">
              <div className="h-7 w-2/3 animate-pulse rounded-field bg-surface-input" />
              <div className="h-9 w-1/3 animate-pulse rounded-field bg-surface-input" />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="mt-7 flex flex-col items-start gap-5 rounded-hero border border-border bg-surface px-8 py-10 compact:mt-5 compact:py-7">
      <span className="flex h-12 w-12 items-center justify-center rounded-field bg-brand-tint">
        <SproutIcon className="h-6 w-6 text-primary" />
      </span>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-serif text-[22px] font-semibold">
          Plant your first dictionary
        </h2>
        <p className="max-w-[46ch] text-base text-muted">
          Choose a language and start collecting the words you want to grow.
        </p>
      </div>
      <Button onClick={onAdd}>Add dictionary</Button>
    </div>
  );
}
