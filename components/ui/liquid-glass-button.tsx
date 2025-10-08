"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";

interface LiquidGlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const LiquidGlassButton = forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  ({ children, onClick, className, variant = "primary", size = "md", disabled = false }, ref) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    };

    const variantClasses = {
      primary: "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-300/30 text-purple-100 hover:from-purple-600/30 hover:to-pink-600/30",
      secondary: "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-300/30 text-blue-100 hover:from-blue-600/30 hover:to-cyan-600/30"
    };

    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "relative overflow-hidden rounded-xl border backdrop-blur-md font-medium transition-all duration-300",
          "shadow-lg hover:shadow-xl",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Glass effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0"
          whileHover={{ opacity: disabled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Liquid animation effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          whileHover={{ translateX: disabled ? "-100%" : "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

LiquidGlassButton.displayName = "LiquidGlassButton";
