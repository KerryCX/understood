import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "./_components/SiteHeader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Understood",
  description:
    "A personal reference of coding problems, solutions, and how I reasoned through them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang='en' className={`site ${inter.variable}`}>
      <body>
        <SiteHeader />
        <div id='main-content' tabIndex={-1} className='mainContent'>
          {children}
        </div>
      </body>
    </html>
  );
}
