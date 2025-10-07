import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import { SplashCursor } from "@/components/WavyBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { ActiveNav } from "@/components/ActiveNav";

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
          <SplashCursor 
            DENSITY_DISSIPATION={1.2}
            VELOCITY_DISSIPATION={0.8}
            PRESSURE={0.8}
            CURL={30}
            SPLAT_RADIUS={0.25}
            SPLAT_FORCE={6000}
            SHADING={true}
            COLOR_UPDATE_SPEED={10}
          />
          <div className="relative z-20">
            <div className="announce-bar">
              <div className="announce-inner">
                <span className="text-xs sm:text-sm">Coming soon — Join waitlist for 1 month free.</span>
                <a href="#contact" className="announce-link">Join now →</a>
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
                  <a href="#contact" className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
                    Join Waitlist
                  </a>
                </div>
              </div>
            </header>
            <main className="relative z-20 pt-20">{children}</main>
            <footer className="mt-24 border-t border-border/60 bg-black/40">
              <div className="container py-10 text-sm text-muted flex flex-col md:flex-row items-center justify-between gap-4">
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
                  <a href="#features" className="hover:text-text">Features</a>
                  <a href="#contact" className="hover:text-text">Contact</a>
                  <a href="#" className="hover:text-text">Privacy</a>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
