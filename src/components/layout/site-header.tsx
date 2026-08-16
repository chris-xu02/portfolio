"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div ref={progressRef} className="scroll-progress" style={{ transform: "scaleX(0)" }} />
      <div
        className={cn(
          "liquid-glass pointer-events-auto mx-auto flex max-w-[1240px] items-center justify-between rounded-full px-3 py-2 sm:px-4",
          scrolled && "shadow-[0_18px_50px_rgba(0,0,0,0.28)]",
        )}
      >
        <Link
          href="/"
          className="rounded-full px-3 py-2 text-sm font-medium tracking-tight"
        >
          {site.name}
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm text-[#1d1d1f]/70 transition-colors hover:text-[#1d1d1f]",
                  active && "bg-[#1d1d1f]/8 text-[#1d1d1f]",
                )}
              >
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="btn-primary ml-2 inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium"
          >
            Let&apos;s Talk
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[#1d1d1f] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setMenuPath(open ? null : pathname)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="pointer-events-auto liquid-glass liquid-glass-panel mx-auto mt-2 max-w-[1240px] rounded-[28px] p-4 md:hidden"
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-3 text-lg text-[#1d1d1f]"
                onClick={() => setMenuPath(null)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary mt-2 inline-flex min-h-12 items-center justify-center rounded-full text-sm font-medium"
              onClick={() => setMenuPath(null)}
            >
              Let&apos;s Talk
            </Link>
          </nav>
        </motion.div>
      ) : null}
      </AnimatePresence>
    </header>
  );
}
