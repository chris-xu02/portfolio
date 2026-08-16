"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { CompanyMark } from "@/components/ui/company-mark";
import { Eyebrow, Section } from "@/components/ui/section";
import { roles } from "@/content/experience";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <Section tone="light" label="Career">
      <div className="reveal max-w-3xl">
        <Eyebrow>Career</Eyebrow>
        <h2 className="section-title mt-4">Bigger work. Same standard.</h2>
        <p className="prose-measure mt-5">
          The work got broader: from shipping features, to systems that move
          money and review cases, to retrieval, laboratory workflows, and the
          operational layer around them. The titles changed. The habit did not.
        </p>
      </div>
      <div ref={ref} className="relative mt-14">
        <span className="absolute top-0 bottom-0 left-0 w-px bg-line" aria-hidden="true" />
        <motion.span
          className="absolute top-0 bottom-0 left-0 w-px origin-top bg-ink"
          style={{ scaleY: reduce ? 1 : scaleY }}
          aria-hidden="true"
        />
        <ol>
        {roles.map((role) => (
          <li key={role.id} className="reveal relative pb-12 pl-16 last:pb-0">
            <CompanyMark
              id={role.id}
              className="absolute top-0 -left-[1.375rem] ring-4 ring-white"
            />
            <p className="text-sm text-muted">{role.dates}</p>
            <h3 className="mt-2 text-2xl tracking-tight">{role.company}</h3>
            <p className="mt-1 text-secondary">
              {role.title}, {role.range}
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-secondary">{role.scope}</p>
            <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-secondary">
              {role.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {role.technologies.length > 0 ? (
              <p className="mt-4 font-mono text-[0.72rem] text-muted">
                {role.technologies.join(" · ")}
              </p>
            ) : null}
          </li>
        ))}
        </ol>
      </div>
    </Section>
  );
}
