"use client";

import "./globals.css";
import Navbar from "@/components/application/Navbar";
import { TrpcProvider } from "@/utils/trpc-provider";
import { DM_Sans } from "next/font/google";

const inter = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <html lang="en" className={inter.className}>
        <body>
          <Navbar />
          {children}
          <div id="MODAL_CONTAINER"></div>
        </body>
      </html>
    </TrpcProvider>
  );
}
