import { cn } from "@/lib/utils";

const tile =
  "h-11 w-11 shrink-0 rounded-[10px] bg-ink text-white shadow-[0_1px_0_rgba(0,0,0,0.04)]";

export function CompanyMark({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  if (id === "airbnb") {
    return (
      <svg viewBox="0 0 44 44" className={cn(tile, className)} aria-hidden="true">
        <path
          fill="currentColor"
          d="M22 10.2c-.7 0-1.3.4-1.7 1L13.2 23.4c-.6.8-.4 1.9.4 2.5.3.2.6.4 1 .4.6 0 1.1-.3 1.4-.7l1.1-1.5v8.4c0 1 .8 1.8 1.8 1.8H21V26.5h2v7.8h2.1c1 0 1.8-.8 1.8-1.8v-8.4l1.1 1.5c.3.4.8.7 1.4.7.4 0 .7-.1 1-.4.8-.6 1-1.7.4-2.5L23.7 11.2c-.4-.6-1-1-1.7-1z"
        />
      </svg>
    );
  }

  if (id === "zoolatech") {
    return (
      <svg viewBox="0 0 44 44" className={cn(tile, className)} aria-hidden="true">
        <path
          fill="currentColor"
          d="M14 14.5h16.2v3.2H19.6l10.4 11.4V29.5H13.6v-3.2h10.2L13.6 15v-.5h.4z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 44 44" className={cn(tile, className)} aria-hidden="true">
      <text
        x="22"
        y="27.5"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fontWeight="650"
        letterSpacing="-0.04em"
      >
        TCS
      </text>
    </svg>
  );
}
