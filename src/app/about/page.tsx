import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { CompanyMark } from "@/components/ui/company-mark";
import { Portrait } from "@/components/ui/portrait";
import { Eyebrow } from "@/components/ui/section";
import { capabilityGroups, roles } from "@/content/experience";
import { principles, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Christopher Xu is a senior software engineer in the Seattle area working across backend systems, distributed services, and applied AI.",
};

export default function AboutPage() {
  return (
    <div className="px-5 pt-32 pb-24 sm:px-8">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-12">
        <Portrait priority className="lg:col-span-5" />
        <div className="lg:col-span-7">
          <Eyebrow>About</Eyebrow>
          <h1 className="section-title mt-4">About me.</h1>
          <p className="prose-measure mt-6">
            I&apos;m Christopher, a software engineer in the greater Seattle area. I
            work on product experiences and the systems behind them: booking
            and payments, compliance operations, retrieval, laboratory
            automation, and the reliability work that shows up after launch.
          </p>
          <p className="prose-measure mt-4">
            {site.statement} That usually means being precise about failure,
            about boundaries, and about what an operator or a customer actually
            sees when something goes wrong.
          </p>
          <p className="mt-6 text-sm text-muted">{site.positioning}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Get in touch</ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              See the work
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1240px]">
        <h2 className="text-3xl tracking-tight">Experience.</h2>
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {roles.map((role) => (
            <li key={role.id} className="grid gap-3 py-6 md:grid-cols-12">
              <p className="font-mono text-xs text-muted md:col-span-2">{role.dates}</p>
              <div className="md:col-span-10">
                <p className="flex items-center gap-3 text-xl tracking-tight">
                  <CompanyMark id={role.id} />
                  <span>
                    {role.title}, {role.company}
                  </span>
                </p>
                <p className="mt-2 max-w-3xl text-secondary">{role.scope}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="theme-light mx-auto mt-20 max-w-[1240px] rounded-[32px] bg-paper p-6 text-ink sm:p-10">
        <h2 className="text-3xl tracking-tight">How I tend to work</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.title}>
              <h3 className="text-xl tracking-tight">{principle.title}</h3>
              <p className="mt-3 text-sm leading-7 text-secondary">{principle.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1240px]">
        <h2 className="text-3xl tracking-tight">Layers I work in</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {capabilityGroups.map((group) => (
            <article key={group.id} className="rounded-[24px] border border-line p-5">
              <h3 className="text-lg">{group.title}</h3>
              <p className="mt-2 font-mono text-[0.72rem] leading-5 text-muted">
                {group.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
