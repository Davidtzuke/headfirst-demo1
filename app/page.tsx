"use client";
import { useState, useEffect } from "react";
import { Box, Zap, Settings, ShoppingCart, Shield, MessageSquare } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Set up scroll reveal animations
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.15
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Enhanced smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href && target.href.includes('#')) {
        const targetId = target.href.split('#')[1];
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Add a subtle page shake effect
          document.body.style.transform = 'scale(0.995)';
          setTimeout(() => {
            document.body.style.transform = 'scale(1)';
          }, 100);
          
          // Smooth scroll with custom easing
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          
          // Update URL
          history.replaceState(null, '', `#${targetId}`);
        }
      }
    };

    // Add click listeners to all anchor links
    document.addEventListener('click', handleAnchorClick);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Home Section */}
      <section id="home" className="container py-28 min-h-screen grid place-items-center text-center reveal" aria-label="Home">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 text-sm uppercase tracking-widest text-muted">Wish4It™</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-3 text-center">Chat.Choose.Checkout.</h1>
          <p className="mb-8 text-muted">
            Coming soon — join the waitlist before launch and get 1 month free.
          </p>
          <p className="text-xs sm:text-sm text-muted mb-8 text-center">Plug and play shopping assistants for e-commerce</p>
          <div className="flex flex-col items-center justify-center gap-4">
            <a 
              href="#contact" 
              className="group relative rounded-lg bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-white/10 overflow-hidden"
            >
              <span className="relative z-10">Join Waitlist</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <button 
              onClick={() => setOpen(true)} 
              className="group relative rounded-lg border border-border px-6 py-3 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-white/5 overflow-hidden"
              type="button"
            >
              <span className="relative z-10">Watch Explanation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <a 
              href="#features" 
              className="group relative rounded-lg border border-border px-4 py-2 text-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">See More</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
        </div>

        {open && (
          <div 
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" 
            onClick={handleBackdropClick}
          >
            <div className="w-full max-w-3xl rounded-lg border border-border bg-surface p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Wish4It™ — Explanation</h4>
                <button 
                  onClick={() => setOpen(false)} 
                  className="rounded-md bg-white/10 px-3 py-1 hover:bg-white/20 transition-colors"
                  type="button"
                >
                  Close
                </button>
              </div>
              <div className="aspect-video w-full bg-black rounded-md overflow-hidden">
                <iframe 
                  src="https://drive.google.com/file/d/1EPhhgDyKlhA2gSnUGWJ0mO5DVMjIy5VF/preview" 
                  className="w-full h-full"
                  allow="autoplay"
                  title="Wish4It Explanation Video"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16 min-h-screen space-y-16" aria-label="Features">
        {/* Main feature section with large card containing title */}
        <div className="max-w-6xl mx-auto reveal">
          <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border-glow-dark dark:border-border-glow-dark light:border-border-glow-light p-2 md:rounded-[1.5rem] md:p-3">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="lg:w-1/3">
                  <div className="w-fit rounded-lg border-[0.75px] border-border-glow-dark dark:border-border-glow-dark light:border-border-glow-light bg-transparent p-2 mb-4">
                    <Box className="h-4 w-4" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-left">What it is</h2>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-muted text-lg leading-relaxed">
                    Plug-and-play AI shopping assistants for SMEs. EU-hosted small language models + retrieval (RAG) to reduce hallucinations and enable
                    fast, personalized discovery-to-checkout — right inside the chat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid section */}
        <div className="max-w-7xl mx-auto reveal">
          <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">Key Features</h3>
          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
              area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
              icon={<Zap className="h-4 w-4" />}
              title="Plug-and-Play Integration"
              description="Widget or full chat without a rebuild. Seamlessly integrate into your existing e-commerce platform."
            />
            <GridItem
              area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
              icon={<Settings className="h-4 w-4" />}
              title="RAG + Small Language Models"
              description="Smaller EU models with retrieval for accuracy. Reduce hallucinations and improve response quality."
            />
            <GridItem
              area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
              icon={<ShoppingCart className="h-4 w-4" />}
              title="Checkout in Chat"
              description="From intent → purchase in one flow. Complete transactions without leaving the conversation."
            />
            <GridItem
              area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
              icon={<Shield className="h-4 w-4" />}
              title="GDPR Compliance"
              description="Privacy by design, EU data residency. Built with European privacy standards in mind."
            />
            <GridItem
              area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
              icon={<MessageSquare className="h-4 w-4" />}
              title="Personalized Guidance"
              description="Reduce friction → fewer abandoned carts. Provide personalized assistance without hiring more staff."
            />
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-16 min-h-screen" aria-label="Contact">
        <div className="max-w-2xl mx-auto text-center mb-8 reveal">
          <h2 className="text-4xl font-bold mb-2">Join the Waitlist</h2>
          <p className="text-muted">Be among the first to try Wish4It™. Get notified when we launch!</p>
        </div>

        <div className="spotlight-card max-w-2xl mx-auto p-6 reveal">
          <form
            action="https://formspree.io/f/xjkabjjy"
            method="POST"
            className="grid gap-4"
          >
            <div>
              <label className="text-sm text-muted">Your email:</label>
              <input 
                type="email" 
                name="email" 
                required 
                className="mt-1 w-full rounded-md border border-border bg-black/30 px-3 py-2 outline-none focus:border-white/60" 
              />
            </div>
            <div>
              <label className="text-sm text-muted">Your message:</label>
              <textarea 
                name="message" 
                rows={4}
                placeholder="Tell us about your business or any questions..."
                className="mt-1 w-full rounded-md border border-border bg-black/30 px-3 py-2 outline-none focus:border-white/60 resize-none" 
              />
            </div>
            <button 
              type="submit" 
              className="rounded-lg bg-white/10 px-5 py-2 hover:bg-white/20 transition-colors"
            >
              Join Waitlist
            </button>
          </form>
        </div>

        <div className="max-w-2xl mx-auto text-center mt-8 reveal">
          <p className="text-muted">
            Or email us: <a className="underline hover:text-text" href="mailto:wish4it.eu@gmail.com">wish4it.eu@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none reveal", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border-glow-dark dark:border-border-glow-dark light:border-border-glow-light p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border-glow-dark dark:border-border-glow-dark light:border-border-glow-light bg-transparent p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-bold tracking-tight md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
