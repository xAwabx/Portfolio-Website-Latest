import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const Poppinsinnit = Poppins({ subsets: ["latin"], weight: ["300"] });

export const metadata: Metadata = {
  title: "Muhammad Awab Saghir",
  description: "Developer Porfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Poppinsinnit.className}>{children}</body>
    </html>
  );
}
