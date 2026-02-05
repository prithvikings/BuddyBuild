import React from "react";

const CTA = () => {
  return (
    <div className="flex justify-center mt-24 px-6">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 sm:p-16">
        {/* Subtle background detail - a very faint radial gradient to draw the eye to the center */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#7c3aed10,transparent_50%)]" />

        <div className="relative flex flex-col items-center gap-6">
          <h2 className="max-w-4xl text-center text-4xl font-poppins tracking-tight text-zinc-50 md:text-5xl">
            Ready to automate the{" "}
            <span className="text-purple-500">boring parts</span> of coding?
          </h2>

          <p className="max-w-sm  text-center text-xs leading-snug text-zinc-400 font-poppins">
            Join the next evolution of software development. Where AI and
            developers build better, together.
          </p>

          <div className="mt-4 flex flex-col items-center gap-3">
            <button
              className="
                group relative cursor-pointer rounded-md bg-purple-600 px-4 py-1.5 
                text-sm  text-white transition-all duration-200
                shadow-[0_1px_0_0_#4c1d95,0_8px_16px_-4px_rgba(0,0,0,0.4)]
                ring-1 ring-purple-400/20 ring-inset
                /* Interactions */
                hover:bg-purple-500 hover:shadow-[0_1px_0_0_#4c1d95,0_12px_20px_-4px_rgba(0,0,0,0.5)]
                active:translate-y-[1px] active:shadow-none font-poppins
              "
            >
              <span className="relative flex items-center gap-2 text-xs">
                Get Started for Free
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </button>

            <p className="text-[11px] font-medium tracking-tight  font-poppins text-zinc-600">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
