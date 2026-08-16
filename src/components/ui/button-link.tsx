import Link from "next/link";
import { cn } from "@/lib/utils";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const classes = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium tracking-tight transition duration-200",
    variant === "primary" && "btn-primary hover:-translate-y-0.5",
    variant === "ghost" &&
      "btn-ghost border border-line text-ink hover:border-iris-soft/50",
    className,
  );

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
