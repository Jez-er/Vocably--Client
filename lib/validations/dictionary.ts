import { z } from "zod";

/**
 * The field is named `languageCode` to match the Spring record component, so the `fieldErrors` key
 * in a 400 VALIDATION_FAILED body lands on this field through `applyFieldErrors`.
 *
 * The form is noValidate and the select starts on an empty, disabled option, so this min(1) is
 * what actually stops an empty submit.
 */
export const createDictionarySchema = z.object({
  languageCode: z.string().min(1, "Choose a language."),
});

export type CreateDictionaryValues = z.infer<typeof createDictionarySchema>;
