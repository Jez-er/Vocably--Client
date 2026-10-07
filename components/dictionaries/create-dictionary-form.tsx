"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { Select } from "@/components/ui/select";
import {
  applyFieldErrors,
  isApiError,
  resolveDictionaryErrorMessage,
  useCreateDictionary,
  type LanguageResponse,
} from "@/lib/api";
import { queryKeys } from "@/lib/query/keys";
import {
  createDictionarySchema,
  type CreateDictionaryValues,
} from "@/lib/validations/dictionary";

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
    register,
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
    return <p className="text-base text-muted">Loading languages…</p>;
  }

  if (languages.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <p className="text-base text-muted">
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
        <Select
          id="dictionary-language"
          label="Language"
          error={errors.languageCode?.message}
          defaultValue=""
          {...register("languageCode")}
        >
          <option value="" disabled>
            Choose a language
          </option>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.flag ? `${language.flag} ${language.title}` : language.title}
            </option>
          ))}
        </Select>
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
