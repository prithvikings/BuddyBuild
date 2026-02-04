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
        <h1 className="text-5xl font-poppins text-zinc-50">
          Code Reviews on Autopilot
        </h1>
        <p className="text-sm font-poppins text-zinc-300 max-w-lg mx-auto">
          Stop waiting for senior engineers. Get instant, persona-based feedback
          on security, performance, and maintainability.
        </p>
        <button
          onClick={handleGetStarted}
          className=" cursor-pointer mt-4 text-sm bg-purple-600 hover:bg-purple-500 px-3 py-2 text-zinc-100 font-poppins rounded-lg font-medium transition-all"
        >
          {user ? "Open Editor" : "Review My Code - Free"}
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
