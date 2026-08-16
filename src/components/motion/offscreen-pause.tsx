"use client";

import { useEffect, useRef } from "react";

export function OffscreenPause({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        node.dataset.motion = entry?.isIntersecting ? "on" : "off";
      },
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-motion="on" className={className}>
      {children}
    </div>
  );
}
