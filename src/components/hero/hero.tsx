import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { HeroPortraitCube } from "@/components/hero/HeroPortraitCube";
import { site } from "@/content/site";

const previous = ["Airbnb", "Zoolatech", "Tata Consultancy Services"];

export function Hero() {
  return (
    <section className="hero-stage relative overflow-hidden px-5 pt-28 pb-12 sm:px-8 sm:pt-32 sm:pb-16">
      <div className="relative mx-auto max-w-[1240px]">
        <div className="hero-layout">
          <div className="hero-text">
            <p className="hero-kicker hero-rise d1">{site.positioning}</p>
            <h1 className="hero-title hero-rise d2">{site.headline}</h1>
            <div className="hero-follow">
              <p className="hero-lede hero-rise d4">{site.heroCopy}</p>
              <div className="hero-rise d5 mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/work">Explore my work</ButtonLink>
                <Link href="/contact" className="hero-quiet underline">
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
          <div className="hero-mark">
            <HeroPortraitCube />
          </div>
        </div>

        <div className="hero-credits hero-rise d5">
          <p className="hero-credits-label">Previously</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {previous.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
