import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

// Using Inter as a clean, highly readable font to contrast the bold aesthetics
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HUH? | The Hardest Guessing Game",
  description: "A wildly unfair, highly aesthetic guessing game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-[#f4f0ea]`}>
        {/* The main content of whatever page the user is on */}
        <div className="flex-grow flex flex-col relative z-10">
          {children}
        </div>
        
        {/* Our new global footer */}
        <Footer />
      </body>
    </html>
  );
}