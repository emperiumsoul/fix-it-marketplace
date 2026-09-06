import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const grotesque = Plus_Jakarta_Sans({
  variable: "--font-grotesque",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fix it — Local Services Marketplace in Ghana",
  description:
    "Find and hire trusted local service providers for plumbing, cleaning, electrical repairs, painting, and more in Ghana.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${grotesque.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#404145]">
        {children}
      </body>
    </html>
  );
}
