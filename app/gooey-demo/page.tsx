import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { SimpleGooeyText } from "@/components/ui/simple-gooey-text";
import { GooeyTextDemo } from "@/components/ui/gooey-text-demo";

export default function GooeyTextDemoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-20">
        <h1 className="text-4xl font-bold text-center mb-12">Gooey Text Morphing Demos</h1>
        
        <div className="space-y-16">
          {/* Performance Comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6">Smooth Performance (Recommended)</h2>
              <div className="h-[120px] flex items-center justify-center border border-border rounded-lg">
                <SimpleGooeyText
                  texts={["Fast", "Smooth", "Stable", "Clean"]}
                  morphTime={1}
                  cooldownTime={1}
                  textClassName="text-3xl md:text-4xl font-bold text-green-500"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Uses CSS transitions - better performance</p>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6">Advanced Animation</h2>
              <div className="h-[120px] flex items-center justify-center border border-border rounded-lg">
                <GooeyText
                  texts={["Gooey", "Morph", "Blend", "Flow"]}
                  morphTime={1}
                  cooldownTime={1}
                  textClassName="text-3xl md:text-4xl font-bold text-blue-500"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Uses SVG filters - more visual effects</p>
            </div>
          </div>
          
          {/* Default Demo */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Original Demo</h2>
            <GooeyTextDemo />
          </div>
          
          {/* Brand Words */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Brand Words</h2>
            <div className="h-[120px] flex items-center justify-center">
              <GooeyText
                texts={["Smart", "Fast", "Easy", "Seamless"]}
                morphTime={1.2}
                cooldownTime={0.8}
                textClassName="text-4xl md:text-6xl font-bold text-blue-500"
              />
            </div>
          </div>
          
          {/* Technical Terms */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Technical Focus</h2>
            <div className="h-[120px] flex items-center justify-center">
              <GooeyText
                texts={["AI", "ML", "API", "SDK"]}
                morphTime={0.8}
                cooldownTime={0.5}
                textClassName="text-5xl md:text-7xl font-mono font-black text-green-400"
              />
            </div>
          </div>
          
          {/* Emotions */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Emotional Impact</h2>
            <div className="h-[120px] flex items-center justify-center">
              <GooeyText
                texts={["Love", "Joy", "Peace", "Hope"]}
                morphTime={1.5}
                cooldownTime={1.0}
                textClassName="text-4xl md:text-6xl font-serif italic text-pink-400"
              />
            </div>
          </div>
          
          {/* Fast Animation */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Fast Animation</h2>
            <div className="h-[120px] flex items-center justify-center">
              <GooeyText
                texts={["Quick", "Rapid", "Swift", "Flash"]}
                morphTime={0.5}
                cooldownTime={0.2}
                textClassName="text-4xl md:text-6xl font-bold text-yellow-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}