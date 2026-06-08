import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Weather Q",
    template: "%s | Weather Q",
  },
  description: "도시별 현재 날씨, 시간별 예보, 3일 예보를 확인할 수 있는 날씨 서비스입니다.",
  openGraph: {
    title: "Weather Q",
    description: "도시별 현재 날씨, 시간별 예보, 3일 예보를 확인할 수 있는 날씨 서비스입니다.",
    url: "/",
    siteName: "Weather Q",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Weather Q",
    description: "도시별 현재 날씨, 시간별 예보, 3일 예보를 확인할 수 있는 날씨 서비스입니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
