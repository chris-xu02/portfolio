import { Eyebrow, Section } from "@/components/ui/section";
import { highlights } from "@/content/site";

export function Intro() {
  return (
    <Section tone="light" label="Introduction">
      <div className="reveal grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>After the ship</Eyebrow>
          <h2 className="section-title mt-4 max-w-[14ch]">
            It has to keep working.
          </h2>
          <p className="prose-measure mt-6">
            Reliability, correctness, and performance are the product once
            someone is actually using it. I have worked on payment and booking
            flows, compliance operations, AI retrieval, laboratory automation,
            and the production debugging that sits underneath all of them.
          </p>
          <p className="prose-measure mt-4">
            The interesting part is rarely the happy path. It is the duplicate
            event, the slow dependency, the answer that needs a source, and the
            workflow a person has to trust at a bench.
          </p>
        </div>
        <dl className="grid gap-8 lg:col-span-5 lg:pt-16">
          {highlights.map((item) => (
            <div key={item.stat} className="border-t border-line pt-4">
              <dt className="text-3xl tracking-tight">{item.stat}</dt>
              <dd className="mt-2 text-secondary">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
