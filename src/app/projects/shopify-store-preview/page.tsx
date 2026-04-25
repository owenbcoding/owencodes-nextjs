import Link from "next/link";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";

function PreviewPanel({ title, description }: { title: string; description: string }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-sm">
      <h2 className="mb-4 text-2xl font-semibold text-white">{title}</h2>
      <div className="mb-4 flex aspect-video items-center justify-center rounded-lg border border-teal-500/20 bg-teal-900/30 text-center text-teal-100/90">
        Video placeholder
      </div>
      <p className="text-sm leading-relaxed text-slate-200">{description}</p>
    </article>
  );
}

export default function ShopifyStorePreviewPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-black via-slate-950 to-teal-950" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-black/70 via-transparent to-teal-900/40" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-14 flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
        <section className="text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-teal-300 uppercase">
            Shopify Store Preview
          </p>
          <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            Before and After
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200 md:text-lg">
            A side-by-side preview space for your Shopify redesign videos. When you add the final clips, these two
            panels can be replaced with embedded video previews.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/projects"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              Back to Projects
            </Link>
            <a
              href="https://brioils.store/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-teal-500/30 px-4 py-2 text-sm font-semibold text-teal-200 transition-colors hover:border-teal-400 hover:text-white"
            >
              Visit Live Store
            </a>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PreviewPanel
            title="Before"
            description="Use this panel for the original store walkthrough video before the redesign."
          />
          <PreviewPanel
            title="After"
            description="Use this panel for the updated store walkthrough video after the redesign."
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
