import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#f8fafc] overflow-hidden">
      {/* Background Gradients aligned with Theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] opacity-60"></div>

      <div className="w-full max-w-[950px] min-h-[580px] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[24px] overflow-hidden relative z-10 flex flex-col md:flex-row transition-all duration-300">
        {/* Left Side: Auth Content */}
        <div className="flex-1 p-6 md:p-6 lg:p-8 flex flex-col relative bg-white">
          <div className="mb-5 flex justify-center">
            <Link href="/" className="flex items-center gap-3 group">
              <h1 className="text-2xl font-bold tracking-tight text-primary">
                Digital Pylot
              </h1>
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center">{children}</div>

          <div className="mt-5 text-center md:text-left">
            <p className="text-xs text-slate-400 flex items-center justify-center md:justify-start gap-4">
              <span>&copy; {new Date().getFullYear()} Digital Pylot</span>
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Visual/Info Panel */}
        <div className="hidden md:flex flex-1 relative bg-linear-to-br from-primary to-[#062c45] text-white p-10 lg:p-12 overflow-hidden items-center justify-center">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <circle cx="400" cy="0" r="300" fill="white" />
              <path d="M0 400 L400 400 L400 0 Z" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 text-center space-y-6 max-w-sm">
            <div className="inline-flex p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 animate-fade-in">
              <div className="grid grid-cols-2 gap-1.5">
                <div className="w-6 h-6 rounded-md bg-accent"></div>
                <div className="w-6 h-6 rounded-md bg-white/40"></div>
                <div className="w-6 h-6 rounded-md bg-white/10"></div>
                <div className="w-6 h-6 rounded-md bg-accent/40"></div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl lg:text-3xl font-bold leading-tight">
                Build Role-Based Products Faster.
              </h2>
              <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
                A reusable authentication and access-control starter for modern
                full-stack applications.
              </p>
            </div>

            <div className="pt-4 flex flex-col items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border border-white/10 bg-slate-800 flex items-center justify-center text-[10px] font-medium"
                  >
                    {i}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border border-white/10 bg-white/10 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold">
                  +1k
                </div>
              </div>
              <p className="text-[10px] font-medium text-slate-400 tracking-wider uppercase">
                Reusable starter interface
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
