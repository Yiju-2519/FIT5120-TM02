import "~/styles/globals.css";

import { Lato, Montserrat } from "next/font/google";
import { type Metadata } from "next";
import React from "react";

import NextTopLoader from "nextjs-toploader";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "react-hot-toast";

// 标题字体 - 使用无衬线的Montserrat作为标题字体
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

// 正文字体 - 保持使用Lato作为正文字体
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "caKnak",
  description: "Your trusted resource for digital safety, security, and citizenship education.",
  icons: [{ rel: "icon", url: "/caknak-logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <body className={lato.className}>
        <NextTopLoader color="#A99479" showSpinner={false} />
        <TRPCReactProvider>
          {children}
          <Toaster position="bottom-right" />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
