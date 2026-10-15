import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { getSiteUrl, HOME_DESCRIPTION, HOME_TITLE, SITE_NAME } from "@/lib/site";
import { THEME_COOKIE } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: "/images/my-logo-rounded-full.png",
    shortcut: "/images/my-logo-rounded-full.png",
    apple: "/images/my-logo-rounded-full.png",
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
        url: "/images/portrait-notint-removebg.png",
        width: 600,
        height: 600,
        alt: "Owen - Full Stack Dev",
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
        <Analytics />
      </body>
    </html>
  );
}
