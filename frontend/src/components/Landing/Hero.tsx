import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  CheckCircle,
  Zap,
  Shield,
  Brain,
  Gauge,
  ShieldCheck,
  CircleCheck,
  ArrowLeft,
  ArrowLeftRight,
  CloudOff,
  ClockFadingIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Footer from "../ui/Footer";
import CTA from "../ui/Cta";
import CodeReviewHero from "../ui/Reviewanimation";
import ReviewLifeCycle from "../ui/ReviewLifeCycle";
import Features from "../ui/Features";
import Pricing from "../ui/Pricing";

const Hero = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/app"); // If logged in, go straight to app
    } else {
      navigate("/login"); // If not, go to login
    }
  };
  return (
    <header className="max-w-4xl mx-auto pt-32 px-4 bg-zinc-900 pb-8">
      <div className="space-y-4 mt-8 text-center">
        <h1 className="text-5xl font-poppins text-zinc-400">
          Code Reviews on <span className="text-zinc-50">Autopilot</span>
        </h1>
        <p className="text-sm font-poppins text-zinc-300 max-w-lg mx-auto">
          Stop waiting for senior engineers. Get instant, persona-based feedback
          on security, performance, and maintainability.
        </p>
        <button
          onClick={handleGetStarted}
          className="
    group relative cursor-pointer overflow-hidden rounded-md 
    bg-purple-600 hover:bg-purple-500 px-4 py-2 text-sm font-medium font-poppins transition-all duration-150 text-white 
    shadow-[0_1px_0_0_#4c1d95,0_2px_4px_rgba(0,0,0,0.2)] 
    ring-1 ring-purple-400/30 ring-inset
    hover:shadow-[0_1px_0_0_#4c1d95,0_4px_8px_rgba(0,0,0,0.25)]
    active:translate-y-[1px] active:shadow-none
  "
        >
          <span className="relative flex items-center gap-2 tracking-tighter">
            {user ? "Open Editor" : "Review My Code — Free"}

            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-3 w-3 opacity-70 transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
      <CodeReviewHero />

      <div className="bg-zinc-800 h-px w-full mt-24"></div>
      {/* Features Grid */}
      <Features />
      {/* Review Lifecycle */}
      <ReviewLifeCycle />

      <Pricing />
      <div className="bg-zinc-800 h-px w-full mt-24"></div>
      <CTA />

      <div className="bg-zinc-800 h-px w-full mt-24"></div>
      <Footer />
    </header>
  );
};

export default Hero;
