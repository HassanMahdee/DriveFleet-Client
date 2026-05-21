import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { CarsProvider } from "@/contexts/carsContext";
import { ToastContainer } from "react-toastify";
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "DriveFleet — Your Journey Starts Here",
  description: "Rent premium cars with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} font-[--font-outfit] bg-background text-foreground`}
      >
        <Navbar />
        <CarsProvider>
          <Providers>{children}</Providers>
        </CarsProvider>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
