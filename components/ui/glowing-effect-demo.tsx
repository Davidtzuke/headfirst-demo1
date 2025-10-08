"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Card } from "@/components/ui/card";
import { 
  Heart, 
  Star, 
  Gift, 
  Sparkles, 
  Crown, 
  Gem,
  Palette,
  Award,
  Target
} from "lucide-react";

export default function GlowingEffectDemo() {
  const icons = [
    { Icon: Heart, label: "Favorites" },
    { Icon: Star, label: "Featured" },
    { Icon: Gift, label: "Gifts" },
    { Icon: Sparkles, label: "Premium" },
    { Icon: Crown, label: "VIP" },
    { Icon: Gem, label: "Luxury" },
    { Icon: Palette, label: "Creative" },
    { Icon: Award, label: "Winner" },
    { Icon: Target, label: "Goals" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Interactive Glowing Effects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Move your mouse over the cards to see the glowing border effects
          </p>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {icons.map(({ Icon, label }, index) => (
            <Card key={label} className="relative p-6 cursor-pointer group hover:shadow-lg transition-shadow">
              <GlowingEffect
                disabled={false}
                proximity={100}
                spread={40}
                movementDuration={0.8}
                borderWidth={2}
                glow={true}
              />
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Experience premium {label.toLowerCase()} with interactive glowing borders
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="relative p-8">
            <GlowingEffect
              disabled={false}
              proximity={150}
              spread={60}
              movementDuration={1.2}
              borderWidth={3}
              variant="default"
              glow={true}
            />
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Multi-Color Gradient
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dynamic rainbow gradient that follows your cursor with smooth transitions
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                  Purple
                </span>
                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">
                  Gold
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                  Green
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  Blue
                </span>
              </div>
            </div>
          </Card>

          <Card className="relative p-8">
            <GlowingEffect
              disabled={false}
              proximity={120}
              spread={30}
              movementDuration={0.5}
              borderWidth={2}
              variant="white"
              glow={true}
            />
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Minimalist White
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Clean white glow effect perfect for elegant and minimalist designs
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Sparkles className="w-4 h-4" />
                <span>Fast & responsive</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Large Showcase Card */}
        <Card className="relative p-12 text-center">
          <GlowingEffect
            disabled={false}
            proximity={200}
            spread={80}
            movementDuration={1.5}
            borderWidth={4}
            blur={2}
            glow={true}
          />
          <div className="relative z-10 space-y-6">
            <div className="flex justify-center">
              <div className="p-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                <Crown className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Premium Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Elevate your user interface with interactive glowing effects that respond to mouse movement
              and create engaging, modern experiences.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all">
                Get Started
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}