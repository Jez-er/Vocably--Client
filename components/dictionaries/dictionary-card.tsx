import type { DictionaryCard as DictionaryCardData } from "@/shared/api/dictionaries/view";

export function DictionaryCard({
  title,
  flag,
  wordCount,
}: Omit<DictionaryCardData, "id" | "languageCode">) {
  return (
    <article className="flex h-full flex-col gap-5 rounded-stat border border-border bg-surface p-6">
      <div className="flex items-center gap-3">
        {flag && (
          <span aria-hidden="true" className="text-[28px] leading-none">
            {flag}
          </span>
        )}
        <h2 className="font-serif text-[22px] leading-tight font-semibold">
          {title}
        </h2>
      </div>

      <div className="flex items-baseline gap-2">
        {wordCount === null ? (
          <>
            <span className="font-serif text-[38px] leading-none font-bold text-muted">
              —
            </span>
            <span className="text-[15px] text-muted">words</span>
            <span className="sr-only">Word count unavailable</span>
          </>
        ) : (
          <>
            <span className="font-serif text-[38px] leading-none font-bold">
              {wordCount}
            </span>
            <span className="text-[15px] text-muted">
              {wordCount === 1 ? "word" : "words"}
            </span>
          </>
        )}
      </div>
    </article>
  );
}
