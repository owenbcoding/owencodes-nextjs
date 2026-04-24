import Image from "next/image";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-black via-slate-950 to-teal-950" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-black/70 via-transparent to-teal-900/40" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-14 flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
        <section aria-labelledby="intro-heading" className="relative z-10 text-center">
          <h1
            id="intro-heading"
            className="mb-4 mt-5 text-4xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
          >
            Hi I&apos;m Owen,
          </h1>
          <p className="mb-2 text-base text-slate-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] md:text-lg">
            Owencodes - Full Stack Developer
            <br />
            &amp; AI Integrations.
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
                <h2 className="text-4xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  About me!
                </h2>
                <p
                  className="mb-8 max-w-prose text-lg leading-relaxed whitespace-pre-line text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] md:text-xl"
                  style={{ minHeight: 160, overflow: "hidden", letterSpacing: "0.025em", wordSpacing: "0.05em" }}
                >
                  I am a full stack PHP developer. I help businesses and creators bring their ideas to life with
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
