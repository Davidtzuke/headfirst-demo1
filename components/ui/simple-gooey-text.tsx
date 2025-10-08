"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SimpleGooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function SimpleGooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName
}: SimpleGooeyTextProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    if (texts.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsTransitioning(false);
      }, morphTime * 500); // Half of morph time for smooth transition
      
    }, (morphTime + cooldownTime) * 1000);

    return () => clearInterval(interval);
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex items-center justify-center">
        <span
          className={cn(
            "inline-block select-none text-center text-6xl md:text-[60pt] transition-all duration-500",
            "text-foreground",
            isTransitioning ? "blur-sm opacity-50 scale-105" : "blur-0 opacity-100 scale-100",
            textClassName
          )}
          style={{
            filter: isTransitioning ? 'blur(4px)' : 'blur(0px)',
            transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {texts[currentIndex]}
        </span>
      </div>
    </div>
  );
}