import React from "react";
import { barlow, outfit, sacramento } from "../fonts/font";
import "./layout.css";
import "./globals.css";
import "./responsive.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export const metadata = {
  title: "Shubhangi Derhgawen | Journalist Portfolio",
  description: "Official portfolio of Shubhangi Derhgawen — journalist, storyteller, and media professional.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="smooth-scroll">
      <body className={`${outfit.variable} ${barlow.variable} ${sacramento.variable} ${outfit.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}