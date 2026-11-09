import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";

export const metadata = {
  title: "Owen | Skills",
  description: "Skills and technologies.",
  alternates: {
    canonical: "/skills",
  },
};

export default function SkillsPage() {
  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-4xl flex-1 flex-col px-4 py-8">
        <h1 className="theme-heading mt-5 text-center text-4xl font-bold">
          Skills
        </h1>
      </main>

      <Footer />
    </div>
  );
}
