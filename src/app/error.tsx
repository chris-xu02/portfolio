"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="px-5 py-40 sm:px-8">
      <div className="mx-auto max-w-xl">
        <h1 className="section-title">Something broke on this page.</h1>
        <p className="mt-4 text-secondary">
          The rest of the site is still available. You can try this view again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn-primary mt-8 min-h-11 rounded-full px-5 text-sm font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
