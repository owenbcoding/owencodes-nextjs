import { ContactBackground } from "@/components/ContactBackground";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";

export const metadata = {
  title: "Contact | Full Stack Dev",
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

      <main className="relative z-10 mx-auto mt-18 flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        <section
          aria-labelledby="contact-heading"
          className="theme-card mx-auto mt-8 w-full max-w-xl rounded-xl border p-8 shadow-2xl backdrop-blur-md sm:p-10"
        >
          <header className="text-center">
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
