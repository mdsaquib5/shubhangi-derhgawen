import React from "react";
import { barlow, outfit, sacramento } from "../fonts/font";
import "./layout.css";
import "./globals.css";
import "./responsive.css";
import Header from "@/components/layouts/Header";

export const metadata = {
  title: "Influencer Porfolio",
  description: "Influencer Porfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${outfit.variable} ${barlow.variable} ${sacramento.variable} ${outfit.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}