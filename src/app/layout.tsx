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
  title: "Plataforma de Gestão Administrativa - Simplifique sua Gestão",
  description: "Plataforma completa para gestão administrativa com ferramentas rápidas, seguras e intuitivas. Automatize processos, gerencie documentos e otimize sua produtividade.",
  keywords: ["gestão administrativa", "automação", "produtividade", "documentos", "processos"],
  authors: [{ name: "Equipe de Desenvolvimento" }],
  creator: "Plataforma de Gestão Administrativa",
  publisher: "Plataforma de Gestão Administrativa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://localhost:3001'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Plataforma de Gestão Administrativa - Simplifique sua Gestão",
    description: "Plataforma completa para gestão administrativa com ferramentas rápidas, seguras e intuitivas.",
    url: 'https://localhost:3001',
    siteName: 'Plataforma de Gestão Administrativa',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Plataforma de Gestão Administrativa - Simplifique sua Gestão",
    description: "Plataforma completa para gestão administrativa com ferramentas rápidas, seguras e intuitivas.",
  },
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
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50">
          Pular para o conteúdo principal
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
