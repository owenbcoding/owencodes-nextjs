import { ContactBackground } from "@/components/ContactBackground";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";

export const metadata = {
  title: "Contact | Owencodes",
  description:
    "Get in touch with Owen. Book a discovery call and send a message to start a new project.",
};

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-black via-slate-950 to-teal-950" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-black/70 via-transparent to-teal-900/40" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      <ContactBackground />

      <MainNavigation />

      <main className="relative z-10 mx-auto mt-14 flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        <section
          aria-labelledby="contact-heading"
          className="mx-auto mt-8 w-full max-w-xl rounded-xl border border-white/10 bg-black/50 p-8 shadow-2xl backdrop-blur-md sm:p-10"
        >
          <header className="text-center">
            <h1
              id="contact-heading"
              className="theme-heading text-3xl font-bold sm:text-4xl"
            >
              Contact me
            </h1>
            <h2 className="theme-heading mt-2 text-2xl font-semibold sm:text-3xl">
              Let&apos;s work together!
            </h2>
            <p className="theme-body mx-auto mt-4 max-w-prose text-sm leading-relaxed sm:text-base">
              I&apos;m always excited to collaborate on new projects. Whether you
              have a specific idea in mind or need help bringing your vision to
              life, let&apos;s start a conversation.
            </p>
          </header>

          <ContactForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
