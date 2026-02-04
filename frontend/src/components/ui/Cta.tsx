import React from "react";

const CTA = () => {
  return (
    <div className="flex justify-center mt-16">
      <div className="h-68 w-10/12 bg-purple-500/10 flex flex-col justify-center items-center gap-2 p-8 rounded-lg">
        <h1 className="text-4xl font-roboto leading-tight w-lg tracking-tight text-zinc-50 text-center">
          Ready To automate the boring Parts of Coding?
        </h1>
        <p className="text-sm font-poppins text-center w-lg text-zinc-400 my-2">
          Join the next evolution of software development. Where AI and
          developers build better, together.
        </p>
        <button className="bg-purple-500 hover:bg-purple-600 cursor-pointer transition-all duration-300 font-medium font-poppins text-sm text-white px-4 py-2 rounded-lg">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default CTA;
