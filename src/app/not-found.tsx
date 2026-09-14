import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-5 py-40 sm:px-8">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">404</p>
        <h1 className="section-title mt-4">That page is not here.</h1>
        <p className="mt-4 text-secondary">
          The link may be old. The work, the about page, and a way to get in
          touch are still where they were.
        </p>
        <Link href="/" className="mt-8 inline-flex text-ink underline-offset-4 hover:underline">
          Back home
        </Link>
      </div>
    </div>
  );
}
