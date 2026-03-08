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
    apple: "/icons/icon-192x192.png",
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
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": siteContent.global.projectName,
              "url": "https://icare4women.com",
              "medicalSpecialty": "Gynecology",
              "logo": "https://icare4women.com/images/icon-512x512.png"
            })
          }}
        />
        {/* Google Analytics 4 */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXXX');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>
        <AuthProvider>
          <AnimatedBackground />
          <Header />
          <main style={{ minHeight: "80vh", paddingTop: "100px" }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
