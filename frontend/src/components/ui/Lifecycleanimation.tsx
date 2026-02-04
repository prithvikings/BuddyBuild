import React from "react";
import { motion } from "framer-motion";
import {
  GitPullRequest,
  FileJson,
  ShieldCheck,
  CheckCircle2,
  Server,
} from "lucide-react";

const LifecycleAnimation = () => {
  return (
    <div className="w-full h-full min-h-[300px] bg-[#0A0A0A] rounded-xl border border-zinc-800 relative overflow-hidden flex items-center justify-center p-8">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#3f3f46 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* The Pipeline Container */}
      <div className="relative w-full max-w-3xl flex items-center justify-between z-10">
        {/* Connecting Line (The "Pipe") */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-zinc-800 -translate-y-1/2">
          {/* Moving Data Packet */}
          <motion.div
            className="absolute top-0 left-0 h-full w-[100px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            animate={{ left: ["-20%", "120%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Node 1: Ingest (PR Created) */}
        <Node
          icon={<GitPullRequest size={20} />}
          label="PR Created"
          sub="Event Trigger"
          delay={0}
        />

        {/* Node 2: Analysis (The AI Engine) */}
        <Node
          icon={<Server size={20} />}
          label="Analysis"
          sub="Async Workers"
          delay={1}
          activeColor="text-purple-400"
        />

        {/* Node 3: Validation (The Differentiator) */}
        <Node
          icon={<ShieldCheck size={20} />}
          label="Validation"
          sub="Schema Check"
          delay={2}
          activeColor="text-emerald-400"
          isValidator={true}
        />

        {/* Node 4: Output (Result) */}
        <Node
          icon={<FileJson size={20} />}
          label="Report"
          sub="JSON Output"
          delay={3}
        />
      </div>
    </div>
  );
};

// Sub-component for the Diagram Nodes
const Node = ({
  icon,
  label,
  sub,
  delay,
  activeColor = "text-zinc-200",
  isValidator = false,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  delay: number;
  activeColor?: string;
  isValidator?: boolean;
}) => {
  return (
    <div className="relative group">
      {/* The Circle Node */}
      <motion.div
        className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-zinc-800 flex items-center justify-center relative z-20 shadow-xl"
        animate={{
          borderColor: ["#27272a", "#a855f7", "#27272a"],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: delay,
          repeatDelay: 2,
        }}
      >
        <div className={`text-zinc-400 ${activeColor}`}>{icon}</div>

        {/* Special "Verified" Badge for Validator Node */}
        {isValidator && (
          <motion.div
            className="absolute -top-2 -right-2 bg-[#0A0A0A] rounded-full text-emerald-500"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: delay + 0.5,
              repeat: Infinity,
              repeatDelay: 3.7,
              repeatType: "reverse",
            }}
          >
            <CheckCircle2 size={16} fill="black" />
          </motion.div>
        )}
      </motion.div>

      {/* Label Text */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center w-32">
        <h4 className="text-zinc-200 font-mono text-xs font-semibold tracking-wide">
          {label}
        </h4>
        <p className="text-zinc-500 text-[10px] uppercase mt-1">{sub}</p>
      </div>
    </div>
  );
};

export default LifecycleAnimation;
