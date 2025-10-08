"use client";
import { useEffect, useRef } from "react";

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
}

function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 512,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Simplified particle-based fluid effect for production
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return false;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      return true;
    };

    resizeCanvas();

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: { r: number; g: number; b: number };
    }

    const particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    const generateColor = () => {
      const hue = Math.random() * 360;
      const saturation = 50 + Math.random() * 50;
      const lightness = 40 + Math.random() * 30;
      
      // Convert HSL to RGB
      const c = (1 - Math.abs(2 * lightness / 100 - 1)) * saturation / 100;
      const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
      const m = lightness / 100 - c / 2;
      
      let r = 0, g = 0, b = 0;
      if (hue < 60) { r = c; g = x; b = 0; }
      else if (hue < 120) { r = x; g = c; b = 0; }
      else if (hue < 180) { r = 0; g = c; b = x; }
      else if (hue < 240) { r = 0; g = x; b = c; }
      else if (hue < 300) { r = x; g = 0; b = c; }
      else { r = c; g = 0; b = x; }
      
      return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
      };
    };

    const addParticles = (x: number, y: number, count: number = 3) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          color: generateColor()
        });
      }

      // Limit particles
      if (particles.length > 300) {
        particles.splice(0, particles.length - 300);
      }
    };

    const animate = () => {
      // Clear with slight fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add particles at mouse position when moving
      if (isMouseMoving) {
        addParticles(mouseX, mouseY, 2);
        isMouseMoving = false;
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        
        // Apply some physics
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.vy += 0.02; // slight gravity
        
        const alpha = 1 - (particle.life / particle.maxLife);
        const size = 3 + alpha * 4;
        
        if (particle.life < particle.maxLife && alpha > 0) {
          // Create gradient for particle
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, size * 3
          );
          gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha * 0.8})`);
          gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        isMouseMoving = true;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      addParticles(mouseX, mouseY, 10);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        addParticles(mouseX, mouseY, 10);
      }
    };

    const handleResize = () => {
      resizeCanvas();
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div className="fixed top-0 left-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} id="fluid" className="w-screen h-screen" />
    </div>
  );
}

export { SplashCursor };