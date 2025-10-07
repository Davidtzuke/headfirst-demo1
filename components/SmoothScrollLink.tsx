"use client";
import { useEffect } from "react";

interface SmoothScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SmoothScrollLink({ href, children, className, onClick }: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Execute any additional onClick handler
    if (onClick) {
      try {
        onClick();
      } catch (error) {
        console.error('Error in onClick handler:', error);
      }
    }
    
    // Handle hash navigation
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Add a small delay to ensure any ongoing animations complete
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          
          // Update URL hash without triggering page reload
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', href);
          } else {
            // Fallback for older browsers
            window.location.hash = href;
          }
        }, 50);
      } else {
        console.warn(`Target element with id "${targetId}" not found`);
      }
    } else {
      // Handle regular links
      window.location.href = href;
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      role="button"
      tabIndex={0}
    >
      {children}
    </a>
  );
}

// Hook to handle smooth scrolling for browser navigation (back/forward buttons)
export function useSmoothScrollOnLoad() {
  useEffect(() => {
    // Handle browser back/forward
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const targetElement = document.getElementById(hash.substring(1));
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      } else {
        // No hash, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
}