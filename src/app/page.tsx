import Image from "next/image";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-14 flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
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
              alt="Owen - Full Stack PHP Developer with AI Integrations"
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
                  full-stack apps and AI integrations.
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
