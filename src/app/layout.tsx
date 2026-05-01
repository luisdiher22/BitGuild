import "~/app/globals.css";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Press_Start_2P } from "next/font/google";
import { type Metadata } from "next";

import { PHProvider } from "~/components/shared/PosthogProvider";
import { TRPCReactProvider } from "~/trpc/react";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BitGuild — Ship together",
  description:
    "Guild-based platform for software engineers to find co-founders, validate ideas, and ship products together.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${pressStart2P.variable}`}
    >
      <body className="min-h-screen bg-background text-text-primary antialiased">
        {/* WCAG 2.1 AA: skip link is first focusable element */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <PHProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </PHProvider>
      </body>
    </html>
  );
}
