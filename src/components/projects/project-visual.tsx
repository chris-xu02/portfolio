import Image from "next/image";
import type { VisualKind } from "@/content/projects";

const images: Record<VisualKind, string> = {
  rag: "/images/work/knowledge-search.png",
  lab: "/images/work/laboratory-workflow.png",
  payments: "/images/work/booking-payments.png",
  trust: "/images/work/trust-safety.png",
  reliability: "/images/work/engineering-performance.png",
};

export function ProjectVisual({
  kind,
  title,
}: {
  kind: VisualKind;
  title: string;
}) {
  return (
    <figure className="relative aspect-[16/10] w-full overflow-hidden bg-[#1d1d1f]">
      <Image
        src={images[kind]}
        alt=""
        fill
        sizes="(min-width: 1024px) 760px, 100vw"
        className="object-cover object-[center_40%]"
      />
      <figcaption className="sr-only">
        Conceptual visualization for {title}. This is not a screenshot of a
        production system.
      </figcaption>
    </figure>
  );
}
