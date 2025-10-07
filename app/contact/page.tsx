"use client";
import { useEffect } from "react";

export default function ContactRedirect() {
  useEffect(() => {
    // Redirect to main page with contact hash
    window.location.href = "/#contact";
  }, []);

  return (
    <div className="container py-16 min-h-screen grid place-items-center text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Redirecting...</h2>
        <p className="text-muted mb-4">You're being redirected to our new single-page layout.</p>
        <a href="/#contact" className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 transition-colors">
          Go to Contact →
        </a>
      </div>
    </div>
  );
}
