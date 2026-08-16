import { SocialLinks } from "@/components/ui/social-links";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="px-3 pt-4 pb-6 sm:px-5">
      <div className="on-glass liquid-glass mx-auto flex max-w-[1240px] flex-col gap-6 rounded-[32px] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
        <div className="flex items-center gap-4">
          <img
            src="/images/chris-portrait.png"
            alt=""
            width={120}
            height={120}
            className="h-16 w-16 rounded-2xl object-cover object-[center_20%] sm:h-20 sm:w-20"
          />
          <div>
            <p className="text-lg font-medium tracking-tight">{site.name}</p>
            <p className="text-sm">{site.role}</p>
          </div>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
