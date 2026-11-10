import { ContactBackground } from "@/components/ContactBackground";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";

export const metadata = {
  title: "Owen | Contact",
  description:
    "Get in touch with Owen. Send a message or book a discovery call to start a new project.",
};

export default function ContactPage() {
  return (
    <div className="site-shell relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="site-bg-primary pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-side pointer-events-none absolute inset-0 z-0" />
      <div className="site-bg-bottom pointer-events-none absolute inset-0 z-0" />

      <ContactBackground />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-5xl flex-1 flex-col px-4 py-8 sm:px-6">
        <header className="page-fade-in mx-auto mb-8 max-w-2xl px-4 text-center sm:mb-10">
          <p className="theme-accent-text mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
            Get in touch
          </p>
          <h1
            id="contact-heading"
            className="theme-heading text-4xl font-bold tracking-tight sm:text-6xl"
          >
            Let&apos;s work together
          </h1>
          <p className="theme-muted-soft mx-auto mt-5 max-w-xl text-sm leading-relaxed sm:text-base">
            Have an idea in mind? Share a little about it and I&apos;ll get back
            to you soon.
          </p>
        </header>

        <section
          aria-labelledby="contact-heading"
          className="blog-card group page-fade-in page-fade-in-delay-1 relative mx-auto w-full max-w-3xl rounded-2xl p-[1.5px]"
        >
          <span aria-hidden="true" className="blog-card-rgb-border" />
          <div className="blog-card-content relative rounded-[calc(1rem-1.5px)] p-5 shadow-2xl sm:p-8 lg:p-10">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
