"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoundersBannerProps {
  className?: string;
}

const founders = [
  {
    name: "David Vasilescu",
    linkedin: "https://www.linkedin.com/in/david-vasilescu-3b8a23347/",
    role: "Co-Founder"
  },
  {
    name: "Ciprian Nitipir", 
    linkedin: "https://www.linkedin.com/in/ciprian-nitipir-0885b6343/",
    role: "Co-Founder"
  }
];

export function FoundersBanner({ className }: FoundersBannerProps) {
  const [hoveredFounder, setHoveredFounder] = React.useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut"
      }}
      className={cn(
        "mx-auto flex items-center justify-center py-4 px-2 sm:py-6 sm:px-4",
        className
      )}
    >
      <motion.div 
        className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-8 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md px-4 py-4 sm:px-8 sm:py-4 shadow-xl w-full max-w-2xl"
        whileHover={{ 
          scale: 1.01,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Simplified background gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        
        {/* Simplified glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px]">
          <div className="h-full w-full rounded-2xl bg-background/95 backdrop-blur-md" />
        </div>
        
        <div className="relative flex items-center gap-3 text-sm">
          <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-2">
            <Users size={18} className="text-white" />
          </div>
          <span className="font-semibold text-foreground bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 text-center sm:text-left">
            Meet the Founders
          </span>
        </div>
        
        <div className="relative flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full sm:w-auto">
          {founders.map((founder, index) => (
            <motion.a
              key={founder.name}
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-white/10 to-white/5 px-3 py-2 sm:px-5 sm:py-3 text-sm backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start"
              onMouseEnter={() => setHoveredFounder(index)}
              onMouseLeave={() => setHoveredFounder(null)}
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              {/* Founder avatar */}
              <motion.div
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md"
                animate={{
                  boxShadow: hoveredFounder === index 
                    ? "0 4px 15px rgba(59, 130, 246, 0.3)" 
                    : "0 2px 8px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ duration: 0.2 }}
              >
                {founder.name.split(' ').map(n => n[0]).join('')}
              </motion.div>
              
              <motion.div
                className="flex items-center gap-1 sm:gap-2"
                animate={{
                  x: hoveredFounder === index ? 2 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm">
                  {founder.name}
                </span>
                <motion.div
                  animate={{
                    rotate: hoveredFounder === index ? 45 : 0,
                    scale: hoveredFounder === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ExternalLink 
                    size={14} 
                    className="text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200 sm:hidden md:block" 
                  />
                  <ExternalLink 
                    size={16} 
                    className="text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200 hidden sm:block md:hidden" 
                  />
                </motion.div>
              </motion.div>
              
              {/* Simplified hover effect */}
              {hoveredFounder === index && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
