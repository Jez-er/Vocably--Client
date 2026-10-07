"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import {
  applyFieldErrors,
  isApiError,
  resolveDictionaryErrorMessage,
  useCreateDictionary,
  type LanguageResponse,
} from "@/shared/api";
import { queryKeys } from "@/shared/query/keys";
import {
  createDictionarySchema,
  type CreateDictionaryValues,
} from "@/lib/validations/dictionary";
import { LanguageCombobox } from "./language-combobox";

const FIELDS = ["languageCode"] as const;

export type CreateDictionaryFormProps = {
  languages: LanguageResponse[];
  isLanguagesPending: boolean;
  languagesError: unknown;
  onCancel: () => void;
  onCreated: () => void;
};

export function CreateDictionaryForm({
  languages,
  isLanguagesPending,
  languagesError,
  onCancel,
  onCreated,
}: CreateDictionaryFormProps) {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateDictionaryValues>({
    resolver: zodResolver(createDictionarySchema),
    defaultValues: { languageCode: "" },
  });

  const { mutate, isPending, error } = useCreateDictionary();

  const onSubmit = (values: CreateDictionaryValues) =>
    mutate(values, {
      onSuccess: onCreated,
      onError: (cause) => {
        if (applyFieldErrors(cause, setError, FIELDS)) return;

        if (!isApiError(cause)) return;

        if (cause.status === 409) {
          setError("languageCode", {
            type: "server",
            message: "You already have a dictionary for that language.",
          });
          void queryClient.invalidateQueries({
            queryKey: queryKeys.dictionaries.list(),
          });
        }

        if (cause.status === 404) {
          void queryClient.invalidateQueries({
            queryKey: queryKeys.languages.list(),
          });
        }
      },
    });

  if (languagesError) {
    return (
      <div className="flex flex-col gap-5">
        <FormError
          message={resolveDictionaryErrorMessage(languagesError, "list")}
        />
        <Button variant="outline" onClick={onCancel}>
          Close
        </Button>
      </div>
    );
  }

  if (isLanguagesPending) {
    return <p className="text-base text-muted-foreground">Loading languages…</p>;
  }

  if (languages.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <p className="text-base text-muted-foreground">
          You have a dictionary for every language.
        </p>
        <Button variant="outline" onClick={onCancel}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 compact:gap-4">
      <FormError message={resolveDictionaryErrorMessage(error, "create")} />

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 compact:gap-4"
      >
        {/* A combobox is not a native form control, so it goes through Controller rather than
            register(). */}
        <Controller
          control={control}
          name="languageCode"
          render={({ field }) => (
            <LanguageCombobox
              id="dictionary-language"
              label="Language"
              languages={languages}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.languageCode?.message}
              disabled={isPending}
            />
          )}
        />
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Planting…" : "Add dictionary"}
          </Button>
        </div>
      </form>
    </div>
  );
}
