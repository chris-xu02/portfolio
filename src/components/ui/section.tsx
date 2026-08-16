import { cn } from "@/lib/utils";

export function Section({
  id,
  tone = "dark",
  children,
  className,
  label,
}: {
  id?: string;
  tone?: "dark" | "light" | "mist";
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative px-5 py-24 sm:px-8 md:py-32",
        tone === "light"
          ? "theme-light bg-white text-ink"
          : tone === "mist"
            ? "theme-light bg-[#f5f5f7] text-ink"
            : "theme-dark bg-canvas text-ink",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1240px]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-sm text-secondary">
      <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
      {children}
    </p>
  );
}

export function ConceptLabel() {
  return <p className="text-xs text-muted">Conceptual visualization</p>;
}
