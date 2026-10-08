import { z } from "zod";

export const createDictionarySchema = z.object({
  languageCode: z.string().min(1, "Choose a language."),
});

export type CreateDictionaryValues = z.infer<typeof createDictionarySchema>;
