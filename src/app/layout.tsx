import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { getSiteUrl, HOME_DESCRIPTION, HOME_TITLE, SITE_NAME } from "@/lib/site";
import "./globals.css";

const themeScript = `
(() => {
  try {
    const savedTheme = localStorage.getItem("owencodes-theme");
    document.documentElement.dataset.theme = savedTheme === "light" ? "light" : "dark";
  } catch {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IE",
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: "/images/portrait-notint-removebg.png",
        width: 600,
        height: 600,
        alt: "Owen - Full Stack Developer specializing in Automation Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/portrait-notint-removebg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full w-full min-w-0 overflow-x-hidden antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full w-full min-w-0 flex flex-col overflow-x-hidden">
        <Script
          id="owencodes-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
