import "~/styles/globals.css";

import { Roboto, Poppins } from "next/font/google";
import { type Metadata } from "next";
import React from "react";

import NextTopLoader from "nextjs-toploader";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "react-hot-toast";

// Configure Roboto font
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

// Configure Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
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
    <html lang="en" className={`${roboto.variable} ${poppins.variable}`}>
      <body>
        <NextTopLoader color="black" showSpinner={false} />
        <TRPCReactProvider>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
