
export type WordStatus = "SEED" | "SPROUT" | "BLOOM";

export type WordResponse = {
  id: string;
  dictionaryId: string;
  word: string;
  definitions: string[];
  examples: string[];
  synonymsId: string[];
  antonymsId: string[];
  scores: number;
  status: WordStatus;
  createdAt: string;
  updatedAt: string;
};
