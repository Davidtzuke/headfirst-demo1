"use client";

import { UpgradeBannerDemo } from "@/components/ui/upgrade-banner-demo";
import { UpgradeBanner } from "@/components/ui/upgrade-banner";

export default function UpgradeDemoPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Upgrade Banner Demo</h1>
          <p className="text-lg text-muted-foreground">
            Interactive upgrade banner with animated icons and hover effects
          </p>
        </div>
        
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Interactive Demo</h2>
            <UpgradeBannerDemo />
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Integration Examples</h2>
            <div className="grid gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">As Page Header</h3>
                <div className="border rounded-lg p-6 bg-gradient-to-r from-background to-accent/10">
                  <UpgradeBanner />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">As Call-to-Action Section</h3>
                <div className="border rounded-lg p-6 bg-muted/30">
                  <UpgradeBanner />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Inline Content</h3>
                <div className="border rounded-lg p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Join our waitlist to get early access to premium features and exclusive benefits.
                  </p>
                  <UpgradeBanner />
                </div>
              </div>
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Animated Icons</h4>
                <p className="text-sm text-muted-foreground">
                  Four animated settings icons with 720° rotation and scale effects
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Hover Effects</h4>
                <p className="text-sm text-muted-foreground">
                  Engaging hover animations with staggered delays for visual appeal
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Responsive Design</h4>
                <p className="text-sm text-muted-foreground">
                  Adapts perfectly to different screen sizes and orientations
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Performance Optimized</h4>
                <p className="text-sm text-muted-foreground">
                  Smooth 60fps animations optimized for all devices
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
