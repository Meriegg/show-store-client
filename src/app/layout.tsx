"use client";

import "./globals.css";
import Navbar from "@/components/application/Navbar";
import CartItemPreview from "@/components/application/Store/CartItemPreview";
import CartModal from "@/components/application/CartModal";
import { useCart } from "@/lib/zustand/useCart";
import { TrpcProvider } from "@/utils/trpc-provider";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isOpen: isCartModalOpen } = useCart((state) => state);

  return (
    <TrpcProvider>
      <html lang="en" className={clsx(dmSans.className, isCartModalOpen && "overflow-hidden")}>
        <body>
          <CartModal />
          <Navbar />
          <CartItemPreview />
          {children}
          <div id="MODAL_CONTAINER"></div>
        </body>
      </html>
    </TrpcProvider>
  );
}
