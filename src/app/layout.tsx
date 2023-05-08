import "./globals.css";
import Navbar from "@/components/application/Navbar";
import CartItemPreview from "@/components/application/Store/CartItemPreview";
import CartModal from "@/components/application/CartModal";
import { TrpcProvider } from "@/utils/Providers";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <html lang="en" className={dmSans.className}>
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
