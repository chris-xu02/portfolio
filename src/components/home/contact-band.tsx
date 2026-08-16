import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";
import { calendly, site } from "@/content/site";

export function ContactBand() {
  return (
    <Section tone="light" label="Contact" className="!pb-28">
      <div className="reveal max-w-4xl">
        <h2 className="section-title max-w-[16ch]">
          Let's talk.
        </h2>
        <p className="prose-measure mt-6">
          Good problems, good teams, and products worth building.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`mailto:${site.email}`}>Email Christopher</ButtonLink>
          <ButtonLink href={calendly} variant="ghost">
            Book 30 minutes
          </ButtonLink>
        </div>
        <p className="mt-4 text-sm text-secondary">
          <a className="underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <div className="mt-8">
          <SocialLinks includeCalendly />
        </div>
      </div>
    </Section>
  );
}
