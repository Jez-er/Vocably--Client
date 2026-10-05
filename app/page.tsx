export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-field bg-brand">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20V10" />
            <path d="M12 10C12 6 9 4 5 4c0 4 3 6 7 6Z" />
            <path d="M12 14c0-3 3-5 7-5c0 3-3 5-7 5Z" />
          </svg>
        </span>
        <span className="font-serif text-2xl font-semibold">Vocably</span>
      </div>

      <div className="flex max-w-md flex-col gap-3">
        <h1 className="font-serif text-4xl font-semibold">
          Water your garden
        </h1>
        <p className="text-base text-muted">
          Plant your first word and keep growing your vocabulary garden.
        </p>
      </div>

      <button className="inline-flex h-[52px] items-center justify-center rounded-button bg-primary px-6 font-sans text-base font-semibold text-white">
        Start practice
      </button>
    </main>
  );
}
