import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { BirthdayConfetti } from "@/components/BirthdayConfetti";
import { MainNavigation } from "@/components/MainNavigation";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { RotatingWord } from "@/components/RotatingWord";
import { CV_DOWNLOAD_URL } from "@/lib/cv";
import {
  getSiteUrl,
  HOME_DESCRIPTION,
  HOME_TITLE,
  SITE_NAME,
} from "@/lib/site";

const PORTRAIT_ALT = "Owen - Full Stack Dev";

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
        url: "/images/OwenCodes%20Navy%20Tech%20Banner.png",
        width: 2172,
        height: 724,
        alt: "Owen Codes navy tech banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/OwenCodes%20Navy%20Tech%20Banner.png"],
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
      jobTitle: "Full Stack Dev",
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
      <BirthdayConfetti />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
        <section
          aria-labelledby="intro-heading"
          className="relative z-10 text-center"
        >
          <h1
            id="intro-heading"
            className="theme-heading mb-4 mt-5 text-4xl font-bold"
            aria-label="Hi I'm Owen, Software Engineer, Developer, and Innovator"
          >
            Hi I&apos;m Owen,
            <span className="block">
              Software{"\u2009"}
              <RotatingWord />
            </span>
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
                <h2 className="theme-heading text-4xl font-bold">About me!</h2>
                <p className="theme-body mb-5 mt-5 text-lg leading-relaxed md:text-xl">
                  I am a Self taught developer with a passion for coding and
                  problem-solving.
                </p>
                <ul className="theme-body mb-5 flex w-full flex-col gap-2 text-lg leading-relaxed md:text-xl">
                  <li>💻 Self-Taught Programmer</li>
                  <li>💻 Building things that matter</li>
                  <li>🤖 AI &amp; automation</li>
                  <li>👨‍💻 Full Stack Dev</li>
                </ul>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <a
                    href={CV_DOWNLOAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download my CV or resume"
                    className="theme-github-link inline-flex items-center gap-2 rounded-full border border-[rgb(20_184_166/30%)] px-5 py-3 font-semibold transition duration-200"
                  >
                    <svg
                      className="h-5 w-5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 3v11m0 0 4-4m-4 4-4-4M4 15v5h16v-5" />
                    </svg>
                    <span>Download CV / Resume</span>
                  </a>
                  <a
                    href="https://buymeacoffee.com/y6nrvkq"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Buy me a coffee"
                    className="theme-github-link inline-flex items-center gap-2 rounded-full border border-[rgb(20_184_166/30%)] px-5 py-3 font-semibold transition duration-200"
                  >
                    <span aria-hidden="true">☕</span>
                    <span>Buy me a coffee</span>
                  </a>
                </div>
                <div className="mt-3 w-full">
                  <h3 className="theme-heading pb-2 text-xl leading-[1.6] font-semibold">
                    Stay in the loop
                  </h3>
                  <p className="theme-body mt-2 text-sm leading-relaxed md:text-base">
                    Get occasional updates when I ship a new project or publish
                    a new post.
                  </p>
                  <NewsletterSignup />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
