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
    <article className="theme-card flex h-full flex-col rounded-lg border p-6 shadow-2xl backdrop-blur-sm">
      <h2 className="theme-card-title mb-4 text-2xl font-semibold">{title}</h2>
      <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border border-teal-500/20 bg-black">
        <video
          className="h-full w-full object-cover"
          src={src}
          controls
          playsInline
          preload="metadata"
        />
      </div>
      <p className="theme-muted-soft text-sm leading-relaxed">{description}</p>
    </article>
  );
}

export default function ShopifyStorePreviewPage() {
  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
        <section className="text-center">
          <p className="theme-accent-text mb-3 text-sm font-semibold tracking-wide uppercase">
            Shopify Store Preview
          </p>
          <h1 className="theme-heading mb-4 text-4xl font-bold">
            Before and After
          </h1>
          <p className="theme-body mx-auto max-w-2xl text-base md:text-lg">
            Original store walkthrough before the redesign, and the same flows on the new theme and layout.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/projects"
              className="theme-pill rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
            >
              Back to Projects
            </Link>
            <a
              href="https://brioils.store/"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-accent-text rounded-full border border-teal-500/30 px-4 py-2 text-sm font-semibold transition-opacity hover:border-teal-400 hover:opacity-80"
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
