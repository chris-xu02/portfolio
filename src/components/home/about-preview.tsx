import { ButtonLink } from "@/components/ui/button-link";
import { Portrait } from "@/components/ui/portrait";
import { Eyebrow, Section } from "@/components/ui/section";
import { site } from "@/content/site";

export function AboutPreview() {
  return (
    <Section label="About">
      <div className="reveal grid items-center gap-10 lg:grid-cols-12">
        <Portrait className="max-w-md lg:col-span-5" />
        <div className="lg:col-span-7">
          <Eyebrow>About</Eyebrow>
          <h2 className="section-title mt-4">About me.</h2>
          <p className="prose-measure mt-6">
            I&apos;m an engineer in the {site.locationShort}, and I like the
            work that sits on both sides of a product: the interface someone
            uses, and the systems that have to stay correct after they do.
          </p>
          <p className="prose-measure mt-4">{site.positioning}.</p>
          <div className="mt-8">
            <ButtonLink href="/about" variant="ghost">
              More about me
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
