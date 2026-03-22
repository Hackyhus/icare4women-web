import type { Metadata, Viewport } from "next";
import "./globals.css";
import siteContent from "@/config/siteContent.json";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteContent.global.projectName}`,
    default: `${siteContent.global.projectName} - Online Reproductive & Gynecological Consultations`,
  },
  description: siteContent.home.hero.subheadline,
  manifest: "/manifest.json",
  icons: {
    apple: "/icons/icon-192x192.svg",
  },
  openGraph: {
    title: siteContent.global.projectName,
    description: siteContent.home.hero.subheadline,
    url: "https://icare4women.com", 
    siteName: siteContent.global.projectName,
    locale: "en_NG",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#D1A2B5",
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

import ErrorBoundary from "@/components/ui/ErrorBoundary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ... (scripts) */}
      </head>
      <body>
        <ErrorBoundary>
          <AuthProvider>
            <AnimatedBackground />
            <Header />
            <main style={{ minHeight: "80vh", paddingTop: "100px" }}>
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
