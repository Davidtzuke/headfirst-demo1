import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { ActiveNav } from "@/components/ActiveNav";
import { SmoothScrollLink } from "@/components/SmoothScrollLink";
import { FoundersBanner } from "@/components/ui/founders-banner";

export const metadata: Metadata = {
  title: "Wish4It™ — Chat. Choose. Checkout.",
  description: "The European way of e-commerce.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme) {
                  document.documentElement.classList.add(theme);
                } else {
                  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  document.documentElement.classList.add(prefersLight ? 'light' : 'dark');
                }
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SplashCursor />
          <div className="relative z-20">
            <div className="announce-bar">
              <div className="announce-inner">
                <span className="text-xs sm:text-sm">Coming soon — Join waitlist for 1 month free.</span>
                <SmoothScrollLink href="#contact" className="announce-link">Join now →</SmoothScrollLink>
              </div>
            </div>
            <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-black/40 backdrop-blur-md" style={{top: '1.3rem'}}>
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-lg p-1">
                    <Image 
                      src="/logo.png" 
                      alt="Wish4It" 
                      width={40} 
                      height={40} 
                      className="h-10 w-10"
                      priority
                    />
                  </div>
                  <a href="/" className="font-semibold tracking-tight hover:text-text transition-colors">Wish4It™</a>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-muted">
                  <ActiveNav href="#home">Home</ActiveNav>
                  <ActiveNav href="#features">Features</ActiveNav>
                  <ActiveNav href="#contact">Contact</ActiveNav>
                </nav>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                                    <SmoothScrollLink href="#contact" className="group relative rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/20 hover:border-white/40 shadow-lg backdrop-blur-sm">
                    Join Waitlist
                  </SmoothScrollLink>
                </div>
              </div>
            </header>
            <main className="relative z-20 pt-20">{children}</main>
            <footer className="mt-24 border-t border-border/60 bg-black/40">
              <div className="container py-6">
                <FoundersBanner className="mb-6" />
                <div className="py-4 text-sm text-muted flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border/40">
                  <div className="flex items-center gap-2">
                    <Image 
                      src="/logo.png" 
                      alt="" 
                      width={24} 
                      height={24} 
                      className="h-6 w-6 opacity-80"
                    />
                    <span>© {new Date().getFullYear()} Wish4It™ — Built in the EU.</span>
                  </div>
                  <div className="flex gap-6">
                    <SmoothScrollLink href="#features" className="hover:text-text">Features</SmoothScrollLink>
                    <SmoothScrollLink href="#contact" className="hover:text-text">Contact</SmoothScrollLink>
                    <a href="#" className="hover:text-text">Privacy</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
