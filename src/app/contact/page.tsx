import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";
import { calendly, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Email Christopher Xu, connect on LinkedIn, or book a 30-minute conversation.",
};

export default function ContactPage() {
  return (
    <div className="theme-light bg-paper px-5 pt-32 pb-24 text-ink sm:px-8">
      <div className="mx-auto max-w-[880px]">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="section-title mt-4">Let&apos;s talk.</h1>
        <p className="prose-measure mt-6">
          Good problems, good teams, and products worth building.
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <a
            href={`mailto:${site.email}`}
            className="glass-panel flex min-h-40 flex-col justify-between rounded-[28px] p-6 transition duration-200 motion-safe:hover:-translate-y-1"
          >
            <span className="text-sm text-muted">Email</span>
            <span>
              <span className="block text-2xl tracking-tight">Write to me</span>
              <span className="mt-2 block text-sm break-all text-secondary">
                {site.email}
              </span>
            </span>
          </a>
          <a
            href={calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel flex min-h-40 flex-col justify-between rounded-[28px] p-6 transition duration-200 motion-safe:hover:-translate-y-1"
          >
            <span className="text-sm text-muted">30 minutes</span>
            <span>
              <span className="block text-2xl tracking-tight">Book a time</span>
              <span className="mt-2 block text-sm text-secondary">Opens Calendly</span>
            </span>
          </a>
        </div>
        <div className="mt-8">
          <SocialLinks includeCalendly labeled />
        </div>
      </div>
    </div>
  );
}
