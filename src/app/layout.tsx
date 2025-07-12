import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import SoundEffect from "../components/SoundEffect";
import Navbar from "../components/Navbar";
import { personInfo } from "@/lib/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: `${personInfo.name}`,
    template: `${personInfo.name} - %s`,
  },
  description: `${personInfo.description}`,
  keywords: ["88JC", "Tech Enthusiast", "KYDO", "Portofolio", "Personal Website"],
  authors: [{ name: personInfo.name }],
  creator: personInfo.name,
  publisher: personInfo.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: `${personInfo.name}`,
    description: `${personInfo.description}`,
    url: `https://${personInfo.domain}`,
    siteName: `${personInfo.name}'s Personal Website.`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: '/img/kydo.png',
        width: 1200,
        height: 630,
        alt: `${personInfo.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personInfo.name}`,
    description: `${personInfo.description}`,
    creator: `@${personInfo.username}`,
    images: ['/img/kydo.png'],
  },
  icons: {
    icon: '/img/favicon.ico',
    apple: '/img/favicon.ico',
  },
  metadataBase: new URL(`https://${personInfo.domain}`),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (err) {}
                
                function handleContextMenu(e) {
                  var target = e.target;
                  if (target.tagName === 'IMG' || target.closest('img')) {
                    e.preventDefault();
                    return false;
                  }
                }
                document.addEventListener('contextmenu', handleContextMenu);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased font-sans min-h-screen text-base`}
      >
        <SoundEffect />
        <Navbar position="footer" />
        {children}
        <Analytics />

      </body>
    </html>
  );
}
