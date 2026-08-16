import type { ReactNode } from "react";
import { calendly, socials } from "@/content/site";

const icons: Record<string, ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.84v2.11h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.67c0-1.83-.03-4.18-2.55-4.18-2.55 0-2.94 1.99-2.94 4.05V24h-4V8.5z"
      />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 .34c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
      />
    </svg>
  ),
  "Stack Overflow": (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M17.2 20.4v-5.6h1.8V22H4.2v-7.2h1.8v5.6h11.2zM7.1 17.8l11.1 2.3.4-1.8-11.1-2.3-.4 1.8zm1-4.1 10.3 4.8.8-1.6-10.3-4.8-.8 1.6zm1.8-4.1 8.7 7 .1.1 1.2-1.4-8.8-7.1-1.2 1.4zM15.4 2l-1.6 1.1 6.2 8.8 1.6-1.1L15.4 2zM7.8 14.3l.6 1.7 8.4-3 .1-.1-.6-1.7-8.5 3.1z"
      />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M14.7 10.3 22.4 2h-1.8l-6.7 7.2L8.7 2H2l8.1 11.1L2 22h1.8l7.1-7.6L15.1 22H22l-7.3-11.7zm-2.5 2.7-.8-1.1L4.6 3.3h2.8l5.3 7.1.8 1.1 6.9 9.2h-2.8l-5.4-7.7z"
      />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1zM17.4 6.9a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1zM21.3 7.1a6.3 6.3 0 0 0-1.7-4.5 6.3 6.3 0 0 0-4.5-1.7c-1.8-.1-7.1-.1-8.9 0a6.4 6.4 0 0 0-4.5 1.7A6.4 6.4 0 0 0 .1 7.1c-.1 1.8-.1 7.1 0 8.9a6.3 6.3 0 0 0 1.7 4.5 6.4 6.4 0 0 0 4.5 1.7c1.8.1 7.1.1 8.9 0a6.3 6.3 0 0 0 4.5-1.7 6.3 6.3 0 0 0 1.7-4.5c.1-1.8.1-7.1 0-8.9zm-1.8 10.8a3.6 3.6 0 0 1-2 2c-1.4.6-4.7.4-6.3.4s-4.9.1-6.3-.4a3.6 3.6 0 0 1-2-2c-.6-1.4-.4-4.7-.4-6.3s-.2-4.9.4-6.3a3.6 3.6 0 0 1 2-2c1.4-.6 4.7-.4 6.3-.4s4.9-.2 6.3.4a3.6 3.6 0 0 1 2 2c.6 1.4.4 4.7.4 6.3s.2 4.9-.4 6.3z"
      />
    </svg>
  ),
  Calendly: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm11 8H6v10h12V10zM8 13h2v2H8v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2z"
      />
    </svg>
  ),
};

export function SocialLinks({
  includeCalendly = false,
  labeled = false,
}: {
  includeCalendly?: boolean;
  labeled?: boolean;
}) {
  const items = includeCalendly
    ? [...socials, { label: "Calendly", href: calendly }]
    : socials;

  if (labeled) {
    return (
      <ul className="grid gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center gap-3 rounded-2xl border border-line px-3 text-sm text-ink transition duration-200 hover:border-iris-soft"
            >
              <span className="text-secondary">{icons[item.label]}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            title={item.label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-secondary transition duration-200 motion-safe:hover:-translate-y-0.5 hover:border-iris-soft hover:text-ink"
          >
            {icons[item.label]}
          </a>
        </li>
      ))}
    </ul>
  );
}
