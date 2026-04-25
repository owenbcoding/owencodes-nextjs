import Link from "next/link";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";

const BEFORE_SRC = "/images/shopify-old.mp4";
const AFTER_SRC = "/images/shopify-new.mp4";

function PreviewPanel({
  title,
  description,
  src,
}: {
  title: string;
  description: string;
  src: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-sm">
      <h2 className="mb-4 text-2xl font-semibold text-white">{title}</h2>
      <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border border-teal-500/20 bg-black">
        <video
          className="h-full w-full object-cover"
          src={src}
          controls
          playsInline
          preload="metadata"
        />
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

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
        <section className="text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-teal-300 uppercase">
            Shopify Store Preview
          </p>
          <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            Before and After
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200 md:text-lg">
            Original store walkthrough before the redesign, and the same flows on the new theme and layout.
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
            src={BEFORE_SRC}
            description="Original BRÍ Oils store experience before the redesign and theme work."
          />
          <PreviewPanel
            title="After"
            src={AFTER_SRC}
            description="Updated storefront after scaling, theming, and design changes."
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
