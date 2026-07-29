/**
 * Public identity and links supplied by Christopher.
 * Set NEXT_PUBLIC_SITE_URL to the production origin before launch.
 * On Vercel, the deployment hostname is used when that variable is absent.
 * Canonical URLs stay off for a local build.
 *
 * Still needed from Christopher:
 * - An approved resume file (no download is shown without one)
 * - A production domain
 * - Any TCS project detail he wants named
 */

const localSiteUrl = "http://localhost:3000";

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  const candidate = explicit || vercel;
  if (!candidate) return localSiteUrl;

  const withProtocol = /^https?:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return localSiteUrl;
  }
}

export const siteUrl = resolveSiteUrl();

export const hasPublicUrl = siteUrl !== localSiteUrl;

export const site = {
  name: "Christopher Xu",
  fullName: "Christopher Xu",
  role: "Senior Software Engineer",
  positioning: "Backend Systems · Distributed Systems · Applied AI · Full Stack",
  location: "Redmond / Greater Seattle Area, Washington",
  locationShort: "Seattle Area",
  email: "chrisxu293@outlook.com",
  statement: "I build software that works where it matters.",
  headline: "The systems behind great products.",
  heroCopy:
    "I'm Christopher. I work across distributed backend systems, production AI, and the interfaces that connect people to complex technology.",
  description:
    "Christopher Xu is a senior software engineer in the Seattle area. He builds backend systems, distributed services, applied AI, and the interfaces in front of them.",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const socials = [
  {
    label: "LinkedIn",
    href: "http://www.linkedin.com/in/chris-xu02/",
  },
  { label: "GitHub", href: "https://github.com/chris-xu02" },
  {
    label: "Stack Overflow",
    href: "https://stackoverflow.com/users/33325317/christopher-xu",
  },
  { label: "X", href: "https://x.com/chrisxu293" },
  { label: "Instagram", href: "https://www.instagram.com/chrisxu293/" },
] as const;

export const calendly = "https://calendly.com/christopher-xu2/30min";

export const highlights = [
  {
    stat: "8 years",
    label: "Professional engineering experience.",
  },
  {
    stat: "3 companies",
    label: "TCS, Airbnb, and Zoolatech.",
  },
  {
    stat: "Across the stack",
    label: "Frontend interfaces through distributed backend systems.",
  },
] as const;

export const principles = [
  {
    title: "Build for failure.",
    body: "Distributed systems need a clear story when a dependency is slow, unavailable, or delivers the same event twice. I would rather write that behavior down than meet it for the first time in production.",
  },
  {
    title: "Make complexity manageable.",
    body: "Good interfaces and reliable boundaries help people work with complicated systems. Splitting payment validation from execution, giving scientists a workflow they can configure, and returning a cited answer instead of a bare model response are all versions of that idea.",
  },
  {
    title: "Measure what matters.",
    body: "Traces, tests, and alerts make the next decision less of a guess. The useful question is not whether a dashboard exists. It is whether an engineer can get from a symptom to an explanation without a long detour.",
  },
] as const;
