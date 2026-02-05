import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Terminal,
} from "lucide-react";

const CodeReviewHero = () => {
  const [step, setStep] = useState("idle");
  const [typedCode, setTypedCode] = useState("");

  const fullCode = `func process(data string) {
  // TODO: Refactor this later
  db.Exec("SELECT * FROM users WHERE id=" + data)
}`;

  useEffect(() => {
    let timeout: any;

    if (step === "idle") {
      setTypedCode(""); // Reset code for the next loop
      timeout = setTimeout(() => setStep("typing"), 1000);
    }

    if (step === "typing") {
      if (typedCode.length < fullCode.length) {
        timeout = setTimeout(() => {
          setTypedCode(fullCode.slice(0, typedCode.length + 1));
        }, 30);
      } else {
        timeout = setTimeout(() => setStep("scanning"), 600);
      }
    }

    if (step === "scanning") {
      timeout = setTimeout(() => setStep("result"), 2000);
    }

    if (step === "result") {
      // Loop Trigger: Wait 4 seconds then start over
      timeout = setTimeout(() => setStep("idle"), 4000);
    }

    return () => clearTimeout(timeout);
  }, [step, typedCode]);

  return (
    <div className="w-full max-w-5xl mx-auto my-20 antialiased selection:bg-purple-500/30">
      {/* The Obsidian Stage */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#030303] shadow-2xl">
        {/* Header - Ghost Style */}
        <div className="flex items-center justify-between border-b border-zinc-800/40 bg-zinc-900/10 px-6 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full border border-zinc-700 bg-zinc-800/50" />
            <div className="h-2.5 w-2.5 rounded-full border border-zinc-700 bg-zinc-800/50" />
            <div className="h-2.5 w-2.5 rounded-full border border-zinc-700 bg-zinc-800/50" />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
            <Terminal size={12} strokeWidth={3} className="text-purple-600" />
            <span>BuddyBuild_Core</span>
          </div>
          <div className="w-12" />
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Editor Surface */}
          <div className="col-span-7 p-10 font-mono">
            <div className="mb-6 flex items-center gap-2 opacity-40">
              <span className="text-[11px] text-zinc-400 font-bold uppercase italic">
                service/db.go
              </span>
            </div>

            <pre className="text-[15px] leading-relaxed text-zinc-100">
              <code className="relative">
                {typedCode}
                {(step === "typing" || step === "idle") && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="ml-1 inline-block h-5 w-[2px] bg-purple-500 align-middle shadow-[0_0_8px_#a855f7]"
                  />
                )}
              </code>
            </pre>
          </div>

          {/* Analysis Surface - Deep Recessed Panel */}
          <div className="col-span-5 border-l border-zinc-800/40 bg-zinc-950/40 p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle light hit on the top edge */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent" />

            <div className="space-y-10 relative z-10">
              {/* Context Label */}
              <div>
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-4">
                  Security_Persona
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 shadow-inner">
                    <ShieldCheck size={16} className="text-purple-500" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-zinc-200">
                      Production Guard
                    </span>
                    <span className="block text-[10px] text-zinc-500 font-medium">
                      Policy: OWASP_TOP_10
                    </span>
                  </div>
                </div>
              </div>

              {/* Engine State */}
              <div className="min-h-[140px]">
                <AnimatePresence mode="wait">
                  {step === "scanning" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase tracking-tighter">
                          <span>Analyzing_Entropy</span>
                          <span className="text-purple-500">Running</span>
                        </div>
                        <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                            className="h-full bg-purple-600 shadow-[0_0_10px_#7c3aed]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === "result" && (
                    <motion.div
                      initial={{ y: 12, opacity: 0, scale: 0.98 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      className="space-y-5"
                    >
                      <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                        <CheckCircle2 size={12} strokeWidth={3} />
                        <span>Analysis_Halted</span>
                      </div>

                      {/* The Vuln Card - Zero Fluff, High Contrast */}
                      <div className="relative rounded-xl border border-red-900/30 bg-black p-5 shadow-2xl">
                        <div className="flex items-start gap-3">
                          <AlertTriangle
                            size={18}
                            className="text-red-600 mt-0.5"
                          />
                          <div className="space-y-3">
                            <div>
                              <span className="block text-[11px] font-black text-red-500 uppercase tracking-tighter">
                                Critical_Injection
                              </span>
                              <p className="text-[12px] leading-snug text-zinc-400 mt-1">
                                String concatenation in SQL query detected.
                              </p>
                            </div>
                            <div className="rounded-lg bg-zinc-900/50 p-2.5 border border-zinc-800/50 shadow-inner font-mono">
                              <span className="block text-[9px] text-zinc-500 font-bold mb-1.5 uppercase tracking-tighter">
                                Suggested_Patch:
                              </span>
                              <code className="text-emerald-500 text-[12px] font-bold">
                                db.Exec("... id=?", data)
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Micro-Meta Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-900/50 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
              <div className="flex gap-4">
                <span>Ref: #812</span>
                <span className={step === "result" ? "text-red-900" : ""}>
                  Risk: {step === "result" ? "High" : "---"}
                </span>
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewHero;
