import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
