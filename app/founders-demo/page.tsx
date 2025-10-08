"use client";

import { FoundersBannerDemo } from "@/components/ui/founders-banner-demo";
import { FoundersBanner } from "@/components/ui/founders-banner";

export default function FoundersDemoPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Founders Banner Demo</h1>
          <p className="text-lg text-muted-foreground">
            Interactive founders banner with LinkedIn profile links and hover animations
          </p>
        </div>
        
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Interactive Demo</h2>
            <FoundersBannerDemo />
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Integration Examples</h2>
            <div className="grid gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">As Page Header</h3>
                <div className="border rounded-lg p-6 bg-gradient-to-r from-background to-accent/10">
                  <FoundersBanner />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">As Footer Section</h3>
                <div className="border rounded-lg p-6 bg-muted/30">
                  <FoundersBanner />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Inline Content</h3>
                <div className="border rounded-lg p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with our team to learn more about Wish4It's vision and mission.
                  </p>
                  <FoundersBanner />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}