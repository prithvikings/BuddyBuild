import React from "react";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, Zap, ArrowRight, Terminal, Lock } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden font-poppins">
      {/* Background Decor - Subtle Grid */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#27272a 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Navigation / Back Button (Optional) */}
      <div className="absolute top-8 left-8 z-20">
        <Link
          to={"/"}
          className="text-zinc-500 hover:text-zinc-300 text-sm flex items-center gap-2 transition-colors"
        >
          &larr; Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Main Card Container */}
        <div className="bg-black border-l border-r border-b border-t border-dashed border-zinc-800">
          {/* 1. Header Section */}
          <div className="pt-12 pb-10 px-8 text-center border-b border-dashed border-zinc-800 bg-zinc-900/20">
            <div className="w-12 h-12 bg-lime-400 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_-5px_rgba(163,230,53,0.4)]">
              <Zap className="w-6 h-6 text-black fill-black" />
            </div>

            <h1 className="text-2xl font-medium text-white tracking-tight mb-3">
              Welcome back
            </h1>
            <p className="text-zinc-400 text-sm max-w-xs mx-auto leading-relaxed">
              Sign in to manage your node configurations and monitor detailed
              analytics.
            </p>
          </div>

          {/* 2. Action Section */}
          <div className="p-8 md:p-10 bg-black flex flex-col gap-6">
            {/* Google Button */}
            <button
              onClick={login}
              className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black font-medium py-3 px-4 rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              {/* Google Icon */}
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

              <span className="text-sm font-medium">Continue with Google</span>

              <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 absolute right-4" />
            </button>

            {/* Separator */}
            <div className="flex items-center gap-4">
              <div className="h-px bg-zinc-800 flex-1" />
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">
                Secured by
              </span>
              <div className="h-px bg-zinc-800 flex-1" />
            </div>

            {/* Trust Badges - Grid Layout */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-dashed border-zinc-800 p-3 rounded flex flex-col gap-2 items-start hover:bg-zinc-900/30 transition-colors">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span className="text-[10px] text-zinc-400 font-medium">
                  SOC2 Type II
                  <br />
                  Compliant
                </span>
              </div>
              <div className="border border-dashed border-zinc-800 p-3 rounded flex flex-col gap-2 items-start hover:bg-zinc-900/30 transition-colors">
                <Lock className="w-4 h-4 text-lime-400" />
                <span className="text-[10px] text-zinc-400 font-medium">
                  End-to-End
                  <br />
                  Encryption
                </span>
              </div>
            </div>

            {/* Terminal Style Notice */}
            <div className="bg-zinc-900/50 rounded border border-zinc-800 p-3 flex items-start gap-3">
              <Terminal className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-400 font-mono">
                  <span className="text-lime-400">$</span> auth_session --secure
                </p>
                <p className="text-[10px] text-zinc-500 leading-snug">
                  By authenticating, you agree to our Policy Engine terms and
                  Developer Agreement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
