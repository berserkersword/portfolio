import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { Source_Code_Pro, Fira_Code } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { GlitchProvider } from "@/components/glitchProvider";
import GrainCanvas from "@/components/grainCanvas";
import TestComp from "@/components/test";

// next/font: shriftlar build vaqtida yuklanib, o'z domenimizdan beriladi (render-blocking @import yo'q)
const sourceCode = Source_Code_Pro({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-code",
  display: "swap",
});
const firaCode = Fira_Code({
  subsets: ["latin", "latin-ext"],
  variable: "--font-minicode",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${sourceCode.variable} ${firaCode.variable}`}>
      <body className="relative bg-[#0a0a0a] min-h-screen">
        <GrainCanvas />
        <GlitchProvider />
        <div className="relative z-10">
          <TestComp />
          <Navbar/>
          {children}
          <Analytics />
        <Footer />
        </div>
      </body>
    </html>
  );
}
