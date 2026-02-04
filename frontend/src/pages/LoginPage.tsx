import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  ShieldCheck,
  HandshakeIcon,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* 2. Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glass Container */}
        <div className="bg-[#09090b]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="pt-10 pb-8 px-8 text-center border-b border-white/5">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20">
              <HandshakeIcon className="w-6 h-6 text-white" />
            </div>

            <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">
              Welcome to BuddyBuild
            </h1>
            <p className="text-zinc-400 text-sm">
              Deterministic code reviews for serious engineering teams.
            </p>
          </div>

          {/* Action Section */}
          <div className="p-8 bg-[#09090b]">
            <button
              onClick={login}
              className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-50 active:bg-zinc-100 text-zinc-900 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-[0.98] border border-transparent hover:border-zinc-200 cursor-pointer"
            >
              {/* High-Quality SVG Google Logo */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>

              <span className="font-poppins text-sm tracking-wide">
                Continue with Google
              </span>

              {/* Sliding Arrow Animation */}
              <div className="absolute right-4 flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </div>
            </button>

            {/* Trust Signals */}
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">
                  System Secured
                </span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="bg-zinc-900/50 rounded-lg border border-white/5 p-3 space-y-2">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>SOC2 Compliant Architecture</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Automated OWASP Vulnerability Scanning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="bg-black/20 py-3 text-center border-t border-white/5">
            <p className="text-[10px] text-zinc-600">
              By logging in, you agree to our Policy Engine terms.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ... inside your component
