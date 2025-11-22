import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";
import { ConfigProvider, theme } from "antd";
import AnimatedBackground from "@/components/AnimatedBackground";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KanaStudio",
  description: "轻量、直观、好看的假名学习网页",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimatedBackground />
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <Link href="/landing" className="rounded-2xl border border-cyan-400/30 bg-black/30 px-3 py-1.5 text-cyan-300 hover:bg-cyan-400/10">
            落地页
          </Link>
          <a
            href="https://github.com/hakusai22"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-cyan-400/30 bg-black/30 px-3 py-1.5 text-cyan-300 hover:bg-cyan-400/10"
          >
            GitHub
          </a>
        </div>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorBgLayout: '#0b0b0f',
              colorBgContainer: '#111318',
              colorBgElevated: '#1a1d26',
              colorBorder: '#2a2d3a',
              colorText: '#e6e9ff',
              colorTextSecondary: '#9aa0b4',
              colorTextTertiary: '#6b7280',
              colorPrimary: '#22d4fd',
              colorPrimaryHover: '#5fb3ff',
              fontSize: 14,
              fontSizeLG: 16,
              controlHeightLG: 40,
              borderRadius: 12,
            },
            components: {
              Card: {
                colorBgContainer: '#111318',
                colorBorder: '#2a2d3a',
              },
              Modal: {
                contentBg: '#1a1d26',
                headerBg: '#1a1d26',
              },
              Tabs: {
                itemColor: '#9aa0b4',
                itemSelectedColor: '#22d4fd',
                itemHoverColor: '#5fb3ff',
                inkBarColor: '#22d4fd',
              },
              Segmented: {
                itemSelectedBg: '#22d4fd',
                itemSelectedColor: '#0b0b0f',
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
