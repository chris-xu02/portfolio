import { githubProfile, openSourceRepos } from "@/content/github";
import { Eyebrow } from "@/components/ui/section";

export function OpenSource() {
  return (
    <section className="border-t border-line/80 bg-paper px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1120px]">
        <Eyebrow>Open source</Eyebrow>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="section-title max-w-xl">
            Code that matches the case studies.
          </h2>
          <a
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary underline decoration-line underline-offset-4 transition hover:text-ink"
          >
            github.com/chris-xu02
          </a>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {openSourceRepos.map((repo) => (
            <li key={repo.href}>
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel group flex h-full flex-col rounded-[24px] p-5 transition duration-200 motion-safe:hover:-translate-y-0.5"
              >
                <span className="text-xs uppercase tracking-widest text-muted">
                  {repo.tag}
                </span>
                <span className="mt-2 font-mono text-sm text-ink group-hover:text-iris">
                  {repo.name}
                </span>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary">
                  {repo.summary}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}