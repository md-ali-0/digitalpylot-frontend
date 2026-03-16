import LogoSvg from "@/components/shared/logo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-sans p-4 lg:p-0">
      <div className="w-full max-w-[1360px] flex bg-[#FAFAFA] overflow-hidden">
        {/* Left Pane - Form Area */}
        <div className="w-full lg:w-1/2 flex flex-col relative min-h-[820px] bg-white lg:bg-transparent">
          {/* Brand Header */}
          <header className="p-6 sm:p-8 lg:p-10 absolute top-0 left-0 w-full z-50">
            <Link href="/" className="flex items-center no-underline group w-fit">
              <LogoSvg />
            </Link>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10 w-full mt-24 lg:mt-0">
            <div className="w-full max-w-[440px] bg-white rounded-[32px] p-8 sm:p-12 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-100">
              {children}
            </div>
          </main>
        </div>
        

        {/* Right Pane - Visual Area */}
        <div className="hidden lg:flex lg:w-1/2 justify-end">
          <div className="w-[680px] h-[820px] relative rounded-[20px] overflow-hidden bg-[#FFF5F1]">
            <Image 
              src="/auth-side-banner.png" 
              alt="Background" 
              fill
              className="object-cover"
              priority
            />
            {/* Dashboard Overlay */}
            <div className="absolute w-[960px] h-[600px] animate-dashboard z-20 pointer-events-none rounded-[12px] border-8 border-black/5 shadow-[19px_16px_55px_0px_rgba(0,0,0,0.05)] overflow-hidden bg-white">
              <Image 
                src="/auth-side-dashboard.png" 
                alt="Dashboard Preview" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}