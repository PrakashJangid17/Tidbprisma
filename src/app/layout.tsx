// app/layout.tsx (do NOT include "use client" here)

import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "@/Components/CartContext/page"; // Ensure this path is correct
import Header from "@/app/Header/page"; // Ensure this path is correct

export const metadata = {
  title: "Tidb prisma",
  description: "A Prisma client for Tidb",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
