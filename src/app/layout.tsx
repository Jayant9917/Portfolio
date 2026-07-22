import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/navbar/footer";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { MobileDock } from "@/components/mobile-dock";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://github.com/Jayant9917";
const siteTitle = "Jayant Pratap Singh";
const siteDescription =
  "Full Stack Developer from New Delhi, India focused on backend engineering, secure APIs, databases, and scalable web applications.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteTitle,
  title: {
    default: "Jayant Pratap Singh | Full Stack Developer | Backend-Focused Engineer",
    template: "%s | Jayant Pratap Singh",
  },
  description: siteDescription,
  keywords: ["Jayant Pratap Singh", "Full Stack Developer India", "Backend Engineering", "Node.js", "TypeScript", "PostgreSQL", "MongoDB"],
  authors: [{ name: "Jayant Pratap Singh", url: siteUrl }],
  creator: "Jayant Pratap Singh",
  publisher: "Jayant Pratap Singh",
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Jayant Pratap Singh | Full Stack Developer | Backend-Focused Engineer",
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jayant Pratap Singh - Full Stack Developer | Backend-Focused Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayant Pratap Singh | Full Stack Developer | Backend-Focused Engineer",
    description: siteDescription,
    creator: "@Jayant9917",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`app-body ${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="app-frame min-h-screen bg-background text-foreground">
            <Toaster position="top-center" richColors />
            <Navbar />
            <MobileDock />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
