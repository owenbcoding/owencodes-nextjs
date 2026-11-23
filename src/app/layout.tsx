import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { WhatsNewPopup } from "@/components/WhatsNewPopup";
import { getSiteUrl, HOME_DESCRIPTION, HOME_TITLE, SITE_NAME } from "@/lib/site";
import { THEME_COOKIE } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  // The site ships its own dark/light theme; stop the Dark Reader extension
  // from rewriting the server HTML, which breaks hydration with cosmetic
  // data-darkreader-* attributes and inline style overrides.
  other: {
    "darkreader-lock": "darkreader-lock",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
        url: "/images/OwenCodes%20Navy%20Tech%20Banner.png",
        width: 2172,
        height: 724,
        alt: "Owen Codes navy tech banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/OwenCodes%20Navy%20Tech%20Banner.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get(THEME_COOKIE)?.value === "light" ? "light" : "dark";

  return (
    <html
      lang="en"
      className="h-full w-full min-w-0 overflow-x-hidden antialiased"
      data-theme={theme}
      suppressHydrationWarning
    >
      <body className="min-h-full w-full min-w-0 flex flex-col overflow-x-hidden">
        {children}
        <WhatsNewPopup />
        <Analytics />
      </body>
    </html>
  );
}
