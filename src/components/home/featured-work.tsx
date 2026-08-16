import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GlowLink } from "@/components/motion/glow-link";
import { ProjectVisual } from "@/components/projects/project-visual";
import { Eyebrow, Section } from "@/components/ui/section";
import { getFeaturedProjects, projects } from "@/content/projects";

export function FeaturedWork() {
  const featured = getFeaturedProjects();
  const rest = projects.filter((project) => !project.featured);
  const [lead, ...others] = featured;

  if (!lead) return null;

  return (
    <Section label="Selected work">
      <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>Selected work / 2020–2026</Eyebrow>
          <h2 className="section-title mt-4 max-w-[16ch]">
            Hard problems. Clear answers.
          </h2>
        </div>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-secondary hover:text-ink"
        >
          Full archive
        </Link>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        <ProjectCard project={lead} className="lg:col-span-12 lg:grid-cols-2" wide />
        {others.map((project) => (
          <ProjectCard key={project.slug} project={project} className="lg:col-span-6" />
        ))}
      </div>
      <div className="reveal mt-5 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2">
        {rest.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group glass-panel flex items-center justify-between gap-4 px-5 py-5"
          >
            <span>
              <span className="font-mono text-xs text-muted">{project.index}</span>
              <span className="mt-1 block text-lg tracking-tight">{project.title}</span>
              <span className="mt-1 block text-sm text-secondary">
                {project.company} · {project.period}
              </span>
            </span>
            <ArrowUpRight
              className="card-arrow shrink-0 text-iris-soft"
              size={18}
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({
  project,
  className,
  wide = false,
}: {
  project: ReturnType<typeof getFeaturedProjects>[number];
  className?: string;
  wide?: boolean;
}) {
  return (
    <GlowLink
      href={`/work/${project.slug}`}
      label={`${project.index} ${project.title}, ${project.company}`}
      className={`card-hover reveal grid overflow-hidden rounded-[28px] glass-panel ${className ?? ""}`}
    >
      <div className={`min-h-56 bg-raised ${wide ? "min-h-72" : ""}`}>
        <div className="card-visual h-full">
          <ProjectVisual kind={project.visual} title={project.title} />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-xs text-muted">{project.index}</p>
            <ArrowUpRight className="card-arrow text-iris-soft" size={18} aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-2xl tracking-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-2 text-sm text-secondary">
            {project.company} · {project.period}
          </p>
          <p className="mt-1 text-sm text-muted">{project.role}</p>
          <p className="mt-4 text-base leading-7 text-secondary">{project.summary}</p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line px-2.5 py-1 font-mono text-[0.68rem] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </GlowLink>
  );
}
