import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/lib/env";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Source Map Online Parser",
    template: "%s | Source Map Online Parser",
  },
  description:
    "Online JavaScript Source Map parser, supporting single file parsing and error stack parsing, helping developers quickly locate source code positions.",
  keywords: [
    "source map",
    "sourcemap",
    "javascript",
    "source mapping",
    "error stack",
    "online tool",
    "development tool",
    "debugging tool",
  ],
  authors: [{ name: "Julian Lu" }],
  creator: "Julian Lu",
  publisher: "Julian Lu",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sourcemap.online"),
  openGraph: {
    title: "Source Map Online Parser",
    description:
      "Online JavaScript Source Map parser, supporting single file parsing and error stack parsing, helping developers quickly locate source code positions.",
    url: "https://sourcemap.online",
    siteName: "Source Map Online Parser",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Source Map Online Parser",
    description:
      "Online JavaScript Source Map parser, supporting single file parsing and error stack parsing, helping developers quickly locate source code positions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
        {env.NEXT_PUBLIC_GA_ID !== undefined && (
          <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
        )}
        {env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT !== undefined && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT}`}
            crossOrigin="anonymous"
          ></script>
        )}
      </body>
    </html>
  );
}
