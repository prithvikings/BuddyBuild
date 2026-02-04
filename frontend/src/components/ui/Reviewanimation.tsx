import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Terminal,
} from "lucide-react";

const CodeReviewHero = () => {
  const [step, setStep] = useState("idle"); // idle, typing, scanning, result
  const [typedCode, setTypedCode] = useState("");

  const fullCode = `func process(data string) {
  // TODO: Refactor this later
  db.Exec("SELECT * FROM users WHERE id=" + data)
}`;

  // Sequence Controller
  useEffect(() => {
    let timeout: any;

    // Step 1: Start Typing
    if (step === "idle") {
      timeout = setTimeout(() => setStep("typing"), 500);
    }

    // Step 2: Typing Logic
    if (step === "typing") {
      if (typedCode.length < fullCode.length) {
        timeout = setTimeout(() => {
          setTypedCode(fullCode.slice(0, typedCode.length + 1));
        }, 35); // Typing speed
      } else {
        timeout = setTimeout(() => setStep("scanning"), 500);
      }
    }

    // Step 3: Scanning (The "Schema Validation" Pause)
    if (step === "scanning") {
      timeout = setTimeout(() => setStep("result"), 2000);
    }

    return () => clearTimeout(timeout);
  }, [step, typedCode]);

  return (
    <div className="w-full max-w-5xl mx-auto my-16 font-mono text-sm antialiased">
      {/* Window Container */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl ring-1 ring-white/5">
        {/* Window Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#FF5F56]/50" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#FFBD2E]/50" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#27C93F]/50" />
          </div>
          <div className="flex items-center space-x-2 text-xs text-zinc-500">
            <Terminal size={12} />
            <span>buddybuild-cli — async-review</span>
          </div>
          <div className="w-12" /> {/* Spacer for balance */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 h-[420px]">
          {/* Left Panel: The Code (Input) */}
          <div className="col-span-7 p-8 border-r border-white/5 bg-[#050505] relative">
            <div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-500/0 via-zinc-500/20 to-zinc-500/0 opacity-0 transition-opacity duration-500"
              style={{ opacity: step === "typing" ? 1 : 0 }}
            />

            <div className="text-zinc-500 mb-6 flex justify-between">
              <span>// services/auth/webhook.go</span>
              {step === "typing" && (
                <span className="text-green-500 animate-pulse">
                  ● Typing...
                </span>
              )}
            </div>

            <pre className="text-zinc-300 leading-relaxed text-[15px]">
              <code>
                {typedCode}
                {step === "typing" && (
                  <span className="w-2 h-5 inline-block bg-zinc-500/50 align-middle ml-1 animate-pulse" />
                )}
              </code>
            </pre>
          </div>

          {/* Right Panel: The Policy Engine (Output) */}
          <div className="col-span-5 p-6 bg-[#080808] flex flex-col relative overflow-hidden">
            {/* Background Mesh Gradient for subtle depth */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-zinc-900/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Section 1: Persona Selector */}
            <div className="mb-8 z-10">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold block mb-3">
                Review Policy
              </span>
              <motion.div
                initial={{ opacity: 0.5, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-3 text-zinc-400 bg-zinc-500/10 border border-zinc-500/20 px-3 py-2 rounded-md w-fit"
              >
                <ShieldCheck size={16} />
                <span className="font-medium text-xs">Security Engineer</span>
              </motion.div>
            </div>

            {/* Section 2: The Logic/Scanning State */}
            <div className="flex-1 z-10">
              <AnimatePresence mode="wait">
                {step === "scanning" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 text-zinc-400">
                      <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
                      <span className="text-xs">
                        Parsing Abstract Syntax Tree...
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-zinc-400">
                      {/* Delay this one slightly via css or keyframes for realism */}
                      <div
                        className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span className="text-xs">
                        Validating against OWASP-2021...
                      </span>
                    </div>
                  </motion.div>
                )}

                {step === "result" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* The Schema Validation Success Indicator */}
                    <div className="flex items-center space-x-2 text-emerald-500 text-xs mb-4">
                      <CheckCircle2 size={14} />
                      <span>JSON Schema Validated</span>
                    </div>

                    {/* The "Failure" Card */}
                    <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />

                      <div className="flex items-start space-x-3">
                        <AlertTriangle
                          className="text-red-500 shrink-0 mt-0.5"
                          size={16}
                        />
                        <div>
                          <div className="text-red-400 font-bold text-xs mb-1 tracking-wide">
                            CRITICAL_VULNERABILITY
                          </div>
                          <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                            Raw SQL concatenation detected. This pattern is
                            vulnerable to SQL Injection attacks.
                          </p>

                          {/* Code Fix Recommendation */}
                          <div className="bg-black/50 rounded p-2 border border-white/5">
                            <div className="text-[10px] text-zinc-500 mb-1">
                              Suggested Fix:
                            </div>
                            <code className="text-emerald-400 text-[10px]">
                              db.Exec("SELECT * ... id=?", data)
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Meta Data */}
            <div className="pt-4 border-t border-white/5 z-10 flex justify-between text-[10px] text-zinc-600">
              <span>Determinism Score: 1.0</span>
              <span>Latency: 420ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewHero;
