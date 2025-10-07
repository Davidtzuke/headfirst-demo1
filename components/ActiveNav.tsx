"use client";
import { useEffect, useState } from "react";

interface ActiveNavProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function ActiveNav({ children, href, className = "" }: ActiveNavProps) {
  const [isActive, setIsActive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (href === "#home") {
        // Home is active when at top or before features section
        const featuresSection = document.getElementById("features");
        if (featuresSection) {
          const rect = featuresSection.getBoundingClientRect();
          setIsActive(rect.top > 100);
        } else {
          setIsActive(window.scrollY < 200);
        }
      } else {
        const targetId = href.substring(1); // Remove #
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementTop = rect.top;
          const elementBottom = rect.bottom;
          
          // Consider section active when it's in the viewport center area
          setIsActive(
            elementTop <= windowHeight * 0.5 && 
            elementBottom >= windowHeight * 0.3
          );
        }
      }
    };

    handleScroll(); // Check initial state
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [href]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    
    // Reset clicked state after animation
    setTimeout(() => setIsClicked(false), 200);
    
    const targetId = href.substring(1); // Remove # from href
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Smooth scroll to target
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      
      // Update URL hash without jumping
      history.replaceState(null, '', href);
    }
  };

  return (
    <a 
      href={href}
      onClick={handleClick}
      className={`
        relative px-3 py-2 rounded-lg transition-all duration-300 ease-out
        transform-gpu will-change-transform select-none
        ${isActive 
          ? 'text-white bg-white/10 shadow-lg backdrop-blur-sm' 
          : 'text-muted hover:text-white'
        }
        ${isClicked 
          ? 'scale-95 bg-white/20' 
          : 'scale-100'
        }
        hover:scale-105 hover:bg-white/5 active:scale-95
        before:absolute before:inset-0 before:rounded-lg
        before:bg-gradient-to-r before:from-blue-500/10 before:to-purple-500/10
        before:opacity-0 before:transition-all before:duration-300
        ${isActive ? 'before:opacity-100' : 'hover:before:opacity-60'}
        ${className}
      `}
    >
      <span className="relative z-10 font-medium tracking-wide">
        {children}
      </span>
      
      {/* Active indicator */}
      <div className={`
        absolute -bottom-1 left-1/2 transform -translate-x-1/2
        w-1.5 h-1.5 rounded-full bg-white transition-all duration-300
        ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
      `} />
      
      {/* Click ripple effect */}
      {isClicked && (
        <div className="absolute inset-0 rounded-lg bg-white/10 animate-ping" 
             style={{ animationDuration: '0.3s' }} />
      )}
    </a>
  );
}