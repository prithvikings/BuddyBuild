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
        <Handshake /> BuddyBuild
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
          className=" cursor-pointer bg-purple-600 hover:bg-purple-500 px-2.5 py-1.5 text-white rounded-lg font-medium transition-all"
        >
          {user ? "Go to Dashboard" : "Get Started"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
