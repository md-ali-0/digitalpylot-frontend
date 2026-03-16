"use client";

import { Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in duration-300">
        <div className="relative">
          <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mx-auto">
            <Lock className="text-[#FF6C37] w-14 h-14" />
          </div>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
            Access Denied
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">403 Forbidden</h1>
          <p className="text-gray-500 font-medium max-w-[280px] mx-auto text-[15px]">
            You don't have permission to access this page. Please contact your manager if you believe this is an error.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Link 
            href="/"
            className="w-full h-12 bg-[#FF6C37] text-white rounded-xl text-[15px] font-semibold shadow-[0_6px_20px_rgba(255,108,55,0.3)] hover:bg-[#F25A24] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
          <Link 
            href="/auth/signin"
            className="w-full h-12 bg-white text-gray-700 border border-gray-100 rounded-xl text-[15px] font-semibold hover:bg-gray-50 transition-all flex items-center justify-center"
          >
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
}
