import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/projects/project-visual";
import { Eyebrow } from "@/components/ui/section";
import { getNextProject, getProject, projects } from "@/content/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);

  return (
    <article className="px-5 pt-32 pb-24 sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <Link href="/work" className="text-sm text-secondary hover:text-ink">
          ← All work
        </Link>
        <p className="mt-8 font-mono text-xs text-muted">
          {project.index} · {project.company}
        </p>
        <h1 className="section-title mt-4 max-w-[16ch]">{project.title}</h1>
        <p className="mt-4 text-secondary">
          {project.role} · {project.period}
        </p>
        <div className="glass-panel mt-10 overflow-hidden rounded-[32px]">
          <ProjectVisual kind={project.visual} title={project.title} />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Overview</Eyebrow>
            <p className="mt-4 text-lg leading-8 text-secondary">{project.overview}</p>
          </div>
          <dl className="glass-panel grid gap-4 rounded-[24px] p-5 lg:col-span-5">
            <Meta label="Company" value={project.company} />
            <Meta label="Period" value={project.period} />
            <Meta label="Role" value={project.role} />
            <div>
              <dt className="text-sm text-muted">Stack</dt>
              <dd className="mt-2 text-sm leading-6">{project.technologies.join(" · ")}</dd>
            </div>
          </dl>
        </div>

        <Block title="Problem and context" body={project.context} />
        <BulletBlock title="Engineering constraints" items={project.constraints} />
        <BulletBlock title="My responsibilities" items={project.responsibilities} />

        <section className="mt-14">
          <h2 className="text-2xl tracking-tight">System architecture</h2>
          <p className="mt-2 text-sm text-muted">
            A simplified path. Not an internal diagram.
          </p>
          <ol className="mt-6 flex flex-col gap-3 md:flex-row md:flex-wrap">
            {project.architecture.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-3 rounded-2xl border border-line px-4 py-3"
              >
                <span className="font-mono text-xs text-iris-soft">0{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <Pair title="Technical decisions" items={project.decisions} />
        <Pair title="Challenges and tradeoffs" items={project.tradeoffs} />
        <BulletBlock title="Outcome" items={project.outcomes} />
        <BulletBlock title="What I would keep" items={project.lessons} />

        <Link
          href={`/work/${next.slug}`}
          className="mt-16 block rounded-[28px] border border-line p-6 transition-colors hover:border-iris-soft/50"
        >
          <p className="font-mono text-xs text-muted">Next</p>
          <p className="mt-2 text-2xl tracking-tight">{next.title}</p>
          <p className="mt-2 text-secondary">{next.summary}</p>
        </Link>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <section className="mt-14 max-w-3xl">
      <h2 className="text-2xl tracking-tight">{title}</h2>
      <p className="mt-4 leading-8 text-secondary">{body}</p>
    </section>
  );
}

function BulletBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-14 max-w-3xl">
      <h2 className="text-2xl tracking-tight">{title}</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-secondary">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function Pair({
  title,
  items,
}: {
  title: string;
  items: { title: string; body: string }[];
}) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl tracking-tight">{title}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-[24px] border border-line p-5">
            <h3 className="text-lg tracking-tight">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-secondary">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
