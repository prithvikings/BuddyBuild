import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Code, CheckCircle, Zap, Shield, Handshake } from "lucide-react";

const Navbar = () => {
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
    <div className="px-10 py-4 flex justify-between items-center bg-zinc-900">
      <div className="logo text-xl flex items-center gap-2 font-poppins font-medium text-zinc-50">
        <Handshake className="text-purple-400" /> BuddyBuild
      </div>
      <div className="right flex items-center gap-8 text-xs text-zinc-300 font-poppins">
        <h1 className="cursor-pointer hover:text-zinc-100 transition-all">
          Personas
        </h1>
        <h1 className="cursor-pointer hover:text-zinc-100 transition-all">
          Architectures
        </h1>
        <h1 className="cursor-pointer hover:text-zinc-100 transition-all">
          Pricing
        </h1>
        <h1 className="cursor-pointer hover:text-zinc-100 transition-all">
          Docs
        </h1>
        <button
          onClick={handleGetStarted}
          className="
            relative cursor-pointer rounded-md bg-purple-600 px-3.5 py-1.5 
            text-sm font-semibold text-white transition-all duration-200
            /* Precision Edge & Depth */
            shadow-[0_1px_0_0_#4c1d95,0_2px_4px_rgba(0,0,0,0.3)]
            ring-1 ring-purple-400/20 ring-inset
            /* Hover & Interaction */
            hover:bg-purple-500 hover:shadow-[0_1px_0_0_#4c1d95,0_4px_10px_rgba(0,0,0,0.4)]
            active:translate-y-[1px] active:shadow-none
          "
        >
          <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            {user ? "Go to Dashboard" : "Get Started"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
