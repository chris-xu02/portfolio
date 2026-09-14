import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectVisual } from "@/components/projects/project-visual";
import { Eyebrow } from "@/components/ui/section";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Christopher Xu across retrieval, laboratory workflows, payments, trust and safety, and reliability.",
};

export default function WorkPage() {
  return (
    <div className="px-5 pt-32 pb-24 sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <Eyebrow>Work</Eyebrow>
        <h1 className="section-title mt-4 max-w-[14ch]">
          Five systems, told at the level I can stand behind.
        </h1>
        <p className="prose-measure mt-6">
          Each page is a case study of work I did. The pictures illustrate the
          work. They are not screenshots of a production system. Where a
          number appears, it is one I can verify.
        </p>
        <ol className="mt-14 divide-y divide-line border-y border-line">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group grid gap-6 py-8 lg:grid-cols-12 lg:items-center"
              >
                <div className="lg:col-span-7">
                  <p className="font-mono text-xs text-muted">{project.index}</p>
                  <h2 className="mt-2 text-3xl tracking-tight">{project.title}</h2>
                  <p className="mt-2 text-sm text-secondary">
                    {project.company} · {project.role} · {project.period}
                  </p>
                  <p className="mt-4 max-w-xl leading-7 text-secondary">
                    {project.summary}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink">
                    Read the case study
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </p>
                </div>
                <div className="glass-panel overflow-hidden rounded-[24px] lg:col-span-5">
                  <ProjectVisual kind={project.visual} title={project.title} />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
