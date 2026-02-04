import React from "react";
import {
  Brain,
  ShieldCheck,
  Gauge,
  CheckCircle,
  CircleCheck,
  Zap,
} from "lucide-react";

const Features = () => {
  return (
    <>
      <div className="mt-8">
        <h1 className="text-2xl font-roboto text-zinc-50">Beyond Flaky Ai</h1>
        <p className="text-sm font-poppins text-zinc-400 my-2">
          Why deterministic policies beat probabilistic chat every time.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-12 text-left font-poppins">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <Brain className="w-6 h-6 text-green-400 mb-4" />
            <h3 className="font-medium text-md mb-2">
              Deterministic vs Hallucination
            </h3>
            <p className="text-zinc-400 text-sm">
              LLMs hallucinate. Our policy engine doesn't. Get consistent,
              auditable code reviews every time.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <Zap className="w-6 h-6 text-yellow-400 mb-4" />
            <h3 className="font-medium text-md mb-2">
              Poncy-driven vs. Style-driven
            </h3>
            <p className="text-zinc-400 text-sm">
              Stop arguing about tabs vs. spaces. Enforce your team's coding
              standards automatically.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <CheckCircle className="w-6 h-6 text-blue-400 mb-4" />
            <h3 className="font-medium text-md mb-2">Async vs. Blocking</h3>
            <p className="text-zinc-400 text-sm">
              Stop generic advice. Get feedback specific to your tech stack and
              architecture.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <CheckCircle className="w-6 h-6 text-blue-400 mb-4" />
            <h3 className="font-medium text-md mb-2">Context Aware</h3>
            <p className="text-zinc-400 text-sm">
              Analyze how changes impact your entire system with deep
              repository-level understanding.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h1 className="text-2xl font-roboto text-zinc-50">Active Personas</h1>
        <p className="text-sm font-poppins text-zinc-400 my-2">
          Select the specialized agents that review your codebase.
        </p>
        <div className="grid md:grid-cols-4 gap-2 mt-12 text-left font-poppins">
          <div className="p-4 rounded-md bg-zinc-800 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="bg-sky-400/10 p-2 w-fit rounded-lg mb-4">
                <Brain className="w-5 h-5 text-sky-400" />
              </div>
              <p className="text-zinc-500 text-xs border font-medium border-zinc-700 px-2 py-1">
                Logic
              </p>
            </div>
            <h3 className="font-medium text-md mb-1">Senior Engineer</h3>
            <p className="text-zinc-500 text-xs">Architecture & Patterns</p>
            <ul className="text-zinc-300 text-xs mt-4 space-y-1">
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-sky-400" />
                Code Consistency
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-sky-400" />
                Design Patterns
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-sky-400" />
                Refactoring
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-md bg-zinc-800 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="bg-red-400/10 p-2 w-fit rounded-lg mb-4">
                <ShieldCheck className="w-6 h-6 text-red-400" />
              </div>
              <p className="text-zinc-500 text-xs border font-medium border-zinc-700 px-2 py-1">
                Security
              </p>
            </div>
            <h3 className="font-medium text-md mb-1">Security Auditor</h3>
            <p className="text-zinc-500 text-xs">Vulnerabilities Scan</p>
            <ul className="text-zinc-300 text-xs mt-4 space-y-1">
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-red-400" />
                SQL Injection
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-red-400" />
                XSS Prevention
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-red-400" />
                Auth Validation
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-md bg-zinc-800 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="bg-yellow-400/10 p-2 w-fit rounded-lg mb-4">
                <Gauge className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-zinc-500 text-xs border font-medium border-zinc-700 px-2 py-1">
                Speed
              </p>
            </div>
            <h3 className="font-medium text-md mb-1">Performance Eng</h3>
            <p className="text-zinc-500 text-xs">Optimization</p>
            <ul className="text-zinc-300 text-xs mt-4 space-y-1">
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-yellow-400" />
                Memory Management
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-yellow-400" />
                Algorithmic Efficiency
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-yellow-400" />
                Resource Optimization
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-md bg-zinc-800 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="bg-green-400/10 p-2 w-fit rounded-lg mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-zinc-500 text-xs border font-medium border-zinc-700 px-2 py-1">
                Edu
              </p>
            </div>
            <h3 className="font-medium text-md mb-1">Code Mentor</h3>
            <p className="text-zinc-500 text-xs">Best Practices</p>
            <ul className="text-zinc-300 text-xs mt-4 space-y-1">
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-green-400" />
                DocString
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-green-400" />
                Variable Naming
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-green-400" />
                Readability
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
