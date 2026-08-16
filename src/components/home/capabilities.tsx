import { OffscreenPause } from "@/components/motion/offscreen-pause";
import { Eyebrow, Section } from "@/components/ui/section";
import { capabilityGroups } from "@/content/experience";

const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export function Capabilities() {
  return (
    <Section tone="light" label="Engineering capabilities">
      <div className="reveal max-w-3xl">
        <Eyebrow>Capabilities</Eyebrow>
        <h2 className="section-title mt-4">
          Different layers. One engineering mindset.
        </h2>
      </div>
      <div className="mt-12 grid gap-4 lg:grid-cols-12">
        {capabilityGroups.map((group, index) => (
          <article
            key={group.id}
            className={`reveal flex min-h-64 flex-col justify-between rounded-[24px] border border-line bg-white p-5 shadow-[0_1px_0_rgba(23,25,35,0.04)] ${spans[index]}`}
          >
            <OffscreenPause>
              <Mini visual={group.id} />
            </OffscreenPause>
            <div className="mt-6">
              <h3 className="text-xl tracking-tight">{group.title}</h3>
              <p className="mt-2 font-mono text-[0.72rem] leading-5 text-muted">
                {group.summary}
              </p>
              <p className="mt-3 text-sm leading-6 text-secondary">{group.detail}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-sm text-muted">
        The small diagrams are illustrations of the ideas, not diagrams of an
        employer&apos;s infrastructure.
      </p>
    </Section>
  );
}

function Mini({ visual }: { visual: string }) {
  if (visual === "backend") {
    return (
      <svg viewBox="0 0 280 90" className="h-20 w-full" aria-hidden="true">
        <rect x="8" y="28" width="70" height="34" rx="8" fill="none" stroke="#8E2E22" />
        <text x="43" y="49" textAnchor="middle" fontSize="11" fill="#161815">
          Request
        </text>
        <path className="demo-motion dash" d="M82 45 H130" stroke="#8E2E22" fill="none" />
        <rect x="134" y="22" width="78" height="46" rx="8" fill="#161815" />
        <text x="173" y="49" textAnchor="middle" fontSize="11" fill="#F7F8FA">
          Service
        </text>
        <path className="demo-motion dash" d="M216 45 H250" stroke="#245338" fill="none" />
        <circle cx="262" cy="45" r="6" fill="#245338" />
      </svg>
    );
  }

  if (visual === "distributed") {
    return (
      <div className="relative h-20 overflow-hidden rounded-xl bg-[#161815]" aria-hidden="true">
        <div className="demo-motion stream absolute top-6 h-2 w-16 rounded-full bg-[#C9D7BE]" />
        <div
          className="demo-motion stream absolute top-12 h-2 w-10 rounded-full bg-[#E07A62]"
          style={{ animationDelay: "0.6s" }}
        />
        <p className="absolute right-3 bottom-2 font-mono text-[0.65rem] text-white/70">
          key seen · skip
        </p>
      </div>
    );
  }

  if (visual === "ai") {
    return (
      <div className="flex h-20 items-center gap-2" aria-hidden="true">
        {["Q", "0.9", "0.4", "Cite"].map((item, index) => (
          <div
            key={item}
            className={`grid h-14 flex-1 place-items-center rounded-xl border text-xs ${
              index === 1 || index === 3
                ? "border-[#8E2E22] bg-[#8E2E22]/10 text-[#8E2E22]"
                : "border-[#e3dfd6] text-[#5c677c]"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }

  if (visual === "frontend") {
    return (
      <div className="grid h-20 grid-cols-3 gap-2" aria-hidden="true">
        <div className="rounded-xl border border-[#e3dfd6] p-2">
          <div className="h-2 w-8 rounded bg-[#161815]" />
          <div className="mt-2 h-8 rounded bg-[#f5f4f0]" />
        </div>
        <div className="col-span-2 rounded-xl border border-[#e3dfd6] p-2">
          <div className="h-2 w-16 rounded bg-[#8E2E22]" />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="h-8 rounded bg-[#f5f4f0]" />
            <div className="h-8 rounded bg-[#f5f4f0]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true">
      <div className="flex h-16 items-end gap-1.5">
        {[40, 55, 48, 72, 64, 88, 76].map((height) => (
          <span
            key={height}
            className="flex-1 rounded-sm bg-[#161815]/80"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[0.65rem] text-muted">signal, not a vanity chart</p>
    </div>
  );
}
