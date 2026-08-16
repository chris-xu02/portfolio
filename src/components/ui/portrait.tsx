import Image from "next/image";
import { cn } from "@/lib/utils";

export function Portrait({
  priority = false,
  className,
}: {
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "portrait-frame relative aspect-[4/5] max-h-[36rem] w-full overflow-hidden rounded-2xl bg-raised",
        className,
      )}
    >
      <Image
        src="/q.png"
        alt="Christopher Xu standing outdoors, with the Golden Gate Bridge behind him"
        fill
        priority={priority}
        sizes="(min-width: 1024px) 460px, 92vw"
        className="object-cover object-[center_20%]"
      />
    </figure>
  );
}
