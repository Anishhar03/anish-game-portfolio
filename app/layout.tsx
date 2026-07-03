import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "Anish Kumar | Software Engineer",
    template: "%s | Anish Kumar",
  },
  description:
    "Explore the engineering missions, systems work, and AI projects of Anish Kumar through a playable portfolio.",
  keywords: [
    "Anish Kumar",
    "software engineer",
    "backend engineer",
    "AI engineer",
    "React",
    "FastAPI",
    "Spring Boot",
    "system design",
  ],
  authors: [{ name: "Anish Kumar", url: "https://github.com/Anishhar03" }],
  openGraph: {
    title: "Anish Kumar | Engineering Command Center",
    description:
      "A playable portfolio of production AI, backend, distributed systems, and full-stack missions.",
    type: "website",
    images: ["/og-card.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Kumar | Engineering Command Center",
    description: "Enter a playable portfolio built around real engineering missions.",
    images: ["/og-card.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Anish Kumar",
              url: "https://github.com/Anishhar03",
              sameAs: [
                "https://github.com/Anishhar03",
                "https://www.linkedin.com/in/anish-kumar-98a04a1bb",
              ],
              jobTitle: "Software Engineer",
              alumniOf: "Birla Institute of Technology, Mesra",
            }),
          }}
        />
      </body>
    </html>
  );
}
