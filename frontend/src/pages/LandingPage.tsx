import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <Hero />
    </div>
  );
};
