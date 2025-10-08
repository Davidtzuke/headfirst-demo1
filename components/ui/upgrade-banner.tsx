"use client";

import { motion } from "framer-motion";
import { Settings, Sparkles, Zap, Star } from "lucide-react";

export function UpgradeBanner() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-1"
        whileHover="hover"
        initial="initial"
      >
        <div className="relative rounded-xl bg-white/10 backdrop-blur-sm p-6 text-white">
          {/* Animated Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-3 left-3"
              variants={{
                initial: { rotate: 0, scale: 1 },
                hover: { rotate: 720, scale: 1.2 }
              }}
              transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
            >
              <Settings className="w-4 h-4 text-white/70" />
            </motion.div>
            
            <motion.div
              className="absolute top-3 right-3"
              variants={{
                initial: { rotate: 0, scale: 1 },
                hover: { rotate: -720, scale: 1.2 }
              }}
              transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-white/70" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-3 left-3"
              variants={{
                initial: { rotate: 0, scale: 1 },
                hover: { rotate: 720, scale: 1.2 }
              }}
              transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
            >
              <Zap className="w-4 h-4 text-white/70" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-3 right-3"
              variants={{
                initial: { rotate: 0, scale: 1 },
                hover: { rotate: -720, scale: 1.2 }
              }}
              transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
            >
              <Star className="w-4 h-4 text-white/70" />
            </motion.div>
          </div>

          <div className="text-center space-y-3 relative z-10">
            <motion.div
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.05 }
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold">Join Waitlist</h3>
              <p className="text-sm text-white/90">1 Month Free Access</p>
            </motion.div>
            
            <motion.button
              className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
              variants={{
                initial: { y: 0, boxShadow: "0 0 0 rgba(255,255,255,0)" },
                hover: { 
                  y: -2, 
                  boxShadow: "0 8px 25px rgba(255,255,255,0.15)",
                  backgroundColor: "rgba(255,255,255,0.25)"
                }
              }}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Early Access
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
