import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Lucky Train - Образовательная платформа по трейдингу, стейкингу и биржам",
  description: "Изучайте трейдинг, стейкинг и работу на биржах с помощью обучающих материалов и AI-ассистента",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Navbar />
        <div className="min-h-screen pt-16">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
