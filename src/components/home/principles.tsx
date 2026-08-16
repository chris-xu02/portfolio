import { Eyebrow, Section } from "@/components/ui/section";
import { principles } from "@/content/site";

export function Principles() {
  return (
    <Section tone="mist" label="How I think">
      <div className="reveal max-w-3xl">
        <Eyebrow>How I think</Eyebrow>
        <h2 className="section-title mt-4 max-w-[16ch]">
          The details are the work.
        </h2>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {principles.map((principle, index) => (
          <article key={principle.title} className="reveal">
            <p className="font-mono text-xs text-iris-deep">0{index + 1}</p>
            <h3 className="mt-3 text-2xl tracking-tight">{principle.title}</h3>
            <p className="mt-3 leading-7 text-secondary">{principle.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
