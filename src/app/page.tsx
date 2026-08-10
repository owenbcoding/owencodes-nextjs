import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SkillsSection } from "@/components/SkillsSection";
import { TypewriterText } from "@/components/TypewriterText";
import {
  getSiteUrl,
  HOME_DESCRIPTION,
  HOME_TITLE,
  SITE_NAME,
} from "@/lib/site";

const PORTRAIT_ALT =
  "Owen - Full Stack Developer";

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
              <div className="mx-auto flex w-full max-w-prose flex-col items-start justify-center gap-2 text-left">
                <h2 className="theme-heading text-4xl font-bold">
                  About me!
                </h2>
                <p
                  className="theme-body text-lg leading-relaxed whitespace-pre-line md:text-xl"
                  style={{ minHeight: 160, overflow: "hidden" }}
                >
                  I am a Full Stack Developer. With a passion for coding and problem-solving, I enjoy creating innovative applications that make a difference.{" "}
                  <TypewriterText text="Known as owencodes online." />
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
                  <div className="flex flex-col items-center">
                    <button
                      disabled
                      className="rounded-full cursor-not-allowed bg-cyan-400/50 px-5 py-3 text-sm font-semibold text-slate-950 opacity-70 flex flex-col items-center gap-1"
                    >
                      <span>Package site</span>
                      <span className="text-xs">coming soon</span>
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <Link
                      href="/contact"
                      className="rounded-full mt-3 cursor-pointer bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Book a Call
                    </Link>
                  </div>
                </div>

                <div className="mt-3 w-full">
                  <h3 className="theme-heading pb-2 text-xl leading-[1.6] font-semibold">Stay in the loop</h3>
                  <p className="theme-body mt-2 text-sm leading-relaxed md:text-base">
                    Get occasional updates when I ship a new project or publish a new post.
                  </p>
                  <NewsletterSignup />
                </div>
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
