"use client";

import { useState } from "react";
import { UpgradeBanner } from "./upgrade-banner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

export function UpgradeBannerDemo() {
  const [hovering, setHovering] = useState(false);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Interactive Upgrade Banner</CardTitle>
        <CardDescription>
          Hover over the banner to see the animated effects in action
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          className="flex justify-center p-8 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <UpgradeBanner />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {hovering ? "🎉 Hover detected! Animations active" : "💫 Hover to activate animations"}
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span>• 4 Animated Icons</span>
            <span>• 720° Rotations</span>
            <span>• Scale Effects</span>
            <span>• Smooth Transitions</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center space-y-1">
            <div className="text-lg font-semibold text-purple-600">2s</div>
            <div className="text-xs text-muted-foreground">Animation Duration</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-lg font-semibold text-pink-600">4</div>
            <div className="text-xs text-muted-foreground">Animated Elements</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
