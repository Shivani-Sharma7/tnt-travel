import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { ProfileProvider } from "@/context/ProfileContext";
import ConditionalNavbar from "../components/ConditionalNavbar";
import ProfilePopup from "../components/ProfilePopup";
import VisitTracker from "../components/VisitTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Divine yatra | Explore the World with Us",
  description: "Divine yatra offers unrivaled expertise for unique travel experiences. We're here to take you to your dream travels.",
  openGraph: {
    title: "Divine yatra | Explore the World with Us",
    description: "Divine yatra offers unrivaled expertise for unique travel experiences. We're here to take you to your dream travels.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{background:'#fdf6f3'}}>
        <CartProvider>
          <ProfileProvider>
            <VisitTracker />
            <ConditionalNavbar />
            <ProfilePopup />
            {children}
          </ProfileProvider>
        </CartProvider>
      </body>
    </html>
  );
}
