import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { SkillsSection } from "@/components/SkillsSection";
import {
  getSiteUrl,
  HOME_DESCRIPTION,
  HOME_TITLE,
  SITE_NAME,
} from "@/lib/site";

const PORTRAIT_ALT =
  "Owen - Full Stack Developer specializing in Automation Solutions";

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    type: "website",
    images: [
      {
        url: "/images/portrait-notint-removebg.png",
        width: 600,
        height: 600,
        alt: PORTRAIT_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/portrait-notint-removebg.png"],
  },
};

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${getSiteUrl()}/#website`,
      url: getSiteUrl(),
      name: SITE_NAME,
      description: HOME_DESCRIPTION,
      inLanguage: "en-IE",
    },
    {
      "@type": "Person",
      "@id": `${getSiteUrl()}/#person`,
      name: "Owen",
      url: getSiteUrl(),
      image: `${getSiteUrl()}/images/portrait-notint-removebg.png`,
      jobTitle: "Full Stack Developer",
      description: HOME_DESCRIPTION,
      sameAs: ["https://github.com/owenbcoding"],
    },
    {
      "@type": "WebPage",
      "@id": `${getSiteUrl()}/#webpage`,
      url: getSiteUrl(),
      name: HOME_TITLE,
      description: HOME_DESCRIPTION,
      isPartOf: { "@id": `${getSiteUrl()}/#website` },
      about: { "@id": `${getSiteUrl()}/#person` },
      inLanguage: "en-IE",
    },
  ],
};

export default function Home() {
  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <Script
        id="home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData),
        }}
      />

      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
        <section aria-labelledby="intro-heading" className="relative z-10 text-center">
          <h1
            id="intro-heading"
            className="theme-heading mb-4 mt-5 text-4xl font-bold"
          >
            Hi I&apos;m Owen,
          </h1>
          <p className="theme-body mb-2 text-lg leading-relaxed md:text-xl">
            Full Stack Developer!
          </p>

          <div className="mt-2 flex flex-col items-center justify-center gap-8 md:flex-row">
            <Image
              src="/images/portrait-notint-removebg.png"
              className="relative z-20 mt-5 rounded-full opacity-90"
              style={{ minHeight: 160, overflow: "hidden" }}
              alt={PORTRAIT_ALT}
              width={600}
              height={600}
              priority
            />

            <div className="mt-10 flex w-full flex-col items-center md:ml-10 md:w-1/2 md:items-start">
              <div className="mx-auto flex flex-col items-center justify-center gap-2">
                <h2 className="theme-heading text-4xl font-bold">
                  About me!
                </h2>
                <p
                  className="theme-body max-w-prose text-lg leading-relaxed whitespace-pre-line md:text-xl"
                  style={{ minHeight: 160, overflow: "hidden" }}
                >
                  I am a Full Stack Developer. I help businesses and creators bring their ideas to life with
                  full-stack apps and Automation Solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SkillsSection />
      </main>

      <Footer />
    </div>
  );
}
