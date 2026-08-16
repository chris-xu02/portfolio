"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function GlowLink({
  href,
  className,
  label,
  children,
}: {
  href: string;
  className?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn("pointer-glow relative", className)}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
    >
      {children}
    </Link>
  );
}
