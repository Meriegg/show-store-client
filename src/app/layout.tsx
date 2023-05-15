import "./globals.css";
import Navbar from "@/components/application/Navbar";
import CartItemPreview from "@/components/application/Store/CartItemPreview";
import CartModal from "@/components/application/CartModal";
import Guide from "@/components/application/Guide/Guide";
import { TrpcProvider } from "@/utils/Providers";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm",
});

export const metadata = {
  title: "SHOW STORE | MarioDev | E-commerce demo",
  publisher: "MarioDev",
  authors: [{ name: "MarioDev", url: "https://mariodev.vercel.app" }],
  creator: "MarioDev",
  description:
    "Demo e-commerce website with a fully working admin dashboard and stripe integration.",
  keywords: ["e-commerce", "demo e-commerce", "tRPC", "Next.js 13"],
  applicationName: "SHOW STORE | E-commerce demo",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <html lang="en" className={dmSans.className}>
        <body>
          <CartModal />
          <Navbar />
          <CartItemPreview />
          <Guide />
          {children}
          <div id="MODAL_CONTAINER"></div>
        </body>
      </html>
    </TrpcProvider>
  );
}
