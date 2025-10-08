import * as React from "react";
import { FoundersBanner } from "@/components/ui/founders-banner";

function FoundersBannerDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Founders Banner Demo</h2>
        <p className="text-muted-foreground">
          Interactive banner showcasing the company founders with LinkedIn links
        </p>
      </div>
      
      <div className="space-y-6">
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Default Banner</h3>
          <FoundersBanner />
        </section>
        
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">With Different Backgrounds</h3>
          <div className="space-y-4">
            <div className="bg-accent/20 p-4 rounded-lg">
              <FoundersBanner />
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg">
              <FoundersBanner />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export { FoundersBannerDemo };