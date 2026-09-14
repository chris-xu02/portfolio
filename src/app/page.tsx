import { AboutPreview } from "@/components/home/about-preview";
import { ContactBand } from "@/components/home/contact-band";
import { OpenSource } from "@/components/home/open-source";
import { FeaturedWork } from "@/components/home/featured-work";
import { Intro } from "@/components/home/intro";
import { Principles } from "@/components/home/principles";
import { Timeline } from "@/components/home/timeline";
import { Hero } from "@/components/hero/hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedWork />
      <Timeline />
      <Principles />
      <AboutPreview />
      <OpenSource />
      <ContactBand />
    </>
  );
}
