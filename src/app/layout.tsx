import "./globals.css";
import Navbar from "@/components/application/Navbar";
import { DM_Sans } from "next/font/google";

const inter = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm",
});

export const metadata = {
  title: "SHOW STORE",
  description: "Demo e-commerce store.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
