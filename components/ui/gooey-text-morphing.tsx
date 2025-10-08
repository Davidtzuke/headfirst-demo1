"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const filterIdRef = React.useRef(`threshold-${Math.random().toString(36).substr(2, 9)}`);

  React.useEffect(() => {
    if (texts.length === 0) return;

    let textIndex = 0;
    let morph = 0;
    let cooldown = cooldownTime;
    let lastTime = performance.now();
    let animationId: number;

    // Initialize text content
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[0];
      text2Ref.current.textContent = texts[1] || texts[0];
      text1Ref.current.style.opacity = "100%";
      text2Ref.current.style.opacity = "0%";
    }

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return;
      
      // Clamp fraction to prevent extreme values
      fraction = Math.max(0, Math.min(1, fraction));
      
      // Smoother blur calculation
      const blur1 = fraction < 0.5 ? 0 : (fraction - 0.5) * 16;
      const blur2 = fraction > 0.5 ? 0 : (0.5 - fraction) * 16;
      
      // Smoother opacity transition
      const opacity1 = Math.pow(1 - fraction, 0.3);
      const opacity2 = Math.pow(fraction, 0.3);

      text1Ref.current.style.filter = blur1 > 0 ? `blur(${blur1}px)` : "";
      text1Ref.current.style.opacity = `${opacity1 * 100}%`;
      
      text2Ref.current.style.filter = blur2 > 0 ? `blur(${blur2}px)` : "";
      text2Ref.current.style.opacity = `${opacity2 * 100}%`;
    };

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      // Prevent large delta times (e.g., when tab becomes inactive)
      const dt = Math.min(deltaTime, 0.1);

      if (cooldown > 0) {
        cooldown -= dt;
        
        if (cooldown <= 0) {
          // Start morphing to next text
          textIndex = (textIndex + 1) % texts.length;
          const nextIndex = (textIndex + 1) % texts.length;
          
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex];
            text2Ref.current.textContent = texts[nextIndex];
          }
          
          morph = 0;
        }
      } else {
        // Morphing phase
        morph += dt;
        const fraction = Math.min(morph / morphTime, 1);
        
        setMorph(fraction);
        
        if (fraction >= 1) {
          // Morph complete, start cooldown
          cooldown = cooldownTime;
          morph = 0;
          
          // Reset to clean state
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.style.filter = "";
            text1Ref.current.style.opacity = "0%";
            text2Ref.current.style.filter = "";
            text2Ref.current.style.opacity = "100%";
            
            // Swap the texts for next cycle
            const temp = text1Ref.current.textContent;
            text1Ref.current.textContent = text2Ref.current.textContent;
            text2Ref.current.textContent = temp;
            text1Ref.current.style.opacity = "100%";
            text2Ref.current.style.opacity = "0%";
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterIdRef.current} x="0%" y="0%" width="100%" height="100%">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ 
          filter: `url(#${filterIdRef.current})`,
          willChange: 'transform' // Optimize for animations
        }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
          style={{ willChange: 'opacity, filter' }}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
          style={{ willChange: 'opacity, filter' }}
        />
      </div>
    </div>
  );
}