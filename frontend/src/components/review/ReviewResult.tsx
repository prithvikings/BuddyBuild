import type { CodeReview, ReviewIssue } from "../../types";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Zap,
  Bug,
  Code2,
  Terminal,
  AlertOctagon,
} from "lucide-react";

// --- Color & Icon Logic ---
const getSeverityStyles = (severity: number) => {
  if (severity >= 5)
    return {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
      icon: AlertOctagon,
      label: "Critical",
    };
  if (severity === 4)
    return {
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      text: "text-orange-400",
      icon: AlertTriangle,
      label: "High",
    };
  if (severity === 3)
    return {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      text: "text-yellow-400",
      icon: AlertTriangle,
      label: "Medium",
    };
  return {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    icon: Code2,
    label: "Low",
  };
};

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "security":
      return <ShieldCheck className="w-3.5 h-3.5" />;
    case "performance":
      return <Zap className="w-3.5 h-3.5" />;
    case "bug":
      return <Bug className="w-3.5 h-3.5" />;
    default:
      return <Terminal className="w-3.5 h-3.5" />;
  }
};

export const ReviewResult = ({ review }: { review: CodeReview }) => {
  if (review.status === "FAILED") {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-red-400 bg-red-500/5">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 ring-1 ring-red-500/20">
          <XCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-100">Analysis Failed</h3>
        <p className="mt-2 text-sm text-red-400/80 max-w-xs">
          The policy engine encountered an error. Please check your syntax and
          try again.
        </p>
      </div>
    );
  }

  // Score Calculation
  const score = review.calculated_score || 0;
  const scoreColor =
    score > 80
      ? "text-emerald-400"
      : score > 50
        ? "text-yellow-400"
        : "text-red-400";

  const ringColor =
    score > 80
      ? "stroke-emerald-500"
      : score > 50
        ? "stroke-yellow-500"
        : "stroke-red-500";

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A] overflow-hidden">
      {/* 1. SCORE DASHBOARD HEADER */}
      <div className="p-6 border-b border-white/5 bg-[#0A0A0A]">
        <div className="flex items-start gap-5">
          {/* SVG Progress Ring */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-zinc-800"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className={`${ringColor} drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]`}
                strokeDasharray={`${score}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-lg font-bold ${scoreColor}`}>{score}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-zinc-100 tracking-tight">
                Policy Check Complete
              </h2>
              <span className="text-[10px] text-zinc-500 font-mono">
                {new Date().toLocaleTimeString()}
              </span>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
              {review.summary || "No summary available."}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          <div className="bg-zinc-900/50 rounded border border-white/5 p-2 text-center">
            <div className="text-[10px] uppercase text-zinc-500 font-semibold">
              Issues
            </div>
            <div className="text-sm font-mono text-zinc-200">
              {review.issues?.length || 0}
            </div>
          </div>
          <div className="bg-zinc-900/50 rounded border border-white/5 p-2 text-center">
            <div className="text-[10px] uppercase text-zinc-500 font-semibold">
              Critical
            </div>
            <div className="text-sm font-mono text-red-400">
              {review.issues?.filter((i) => i.severity >= 5).length || 0}
            </div>
          </div>
          <div className="bg-zinc-900/50 rounded border border-white/5 p-2 text-center">
            <div className="text-[10px] uppercase text-zinc-500 font-semibold">
              Passed
            </div>
            <div className="text-sm font-mono text-emerald-400">
              {score > 90 ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>

      {/* 2. ISSUES SCROLL AREA */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3 bg-[#0A0A0A]">
        {review.issues?.map((issue) => {
          const style = getSeverityStyles(issue.severity);
          const SeverityIcon = style.icon;

          return (
            <div
              key={issue.id}
              className={`group relative p-4 rounded-lg border bg-zinc-900/30 hover:bg-zinc-900/60 transition-all duration-200 ${style.border}`}
            >
              {/* Colored left accent line */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${style.bg.replace("/10", "/50")}`}
              />

              <div className="flex items-start justify-between mb-2 pl-2">
                <div
                  className={`flex items-center gap-2 text-xs font-semibold ${style.text}`}
                >
                  <div
                    className={`p-1 rounded bg-black/40 border ${style.border}`}
                  >
                    {getCategoryIcon(issue.category)}
                  </div>
                  <span className="capitalize">{issue.category}</span>
                </div>
                <div
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${style.bg} ${style.border} ${style.text}`}
                >
                  <SeverityIcon className="w-3 h-3" />
                  <span>{style.label}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed pl-2 mb-3">
                {issue.description}
              </p>

              {/* Code Fix Block */}
              {issue.suggestion && (
                <div className="ml-2 mt-2 bg-black/40 rounded border border-white/5 overflow-hidden">
                  <div className="px-3 py-1.5 bg-white/5 border-b border-white/5 flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-zinc-500" />
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Suggested Fix
                    </span>
                  </div>
                  <div className="p-3 overflow-x-auto">
                    <code className="text-[11px] font-mono text-emerald-400 block whitespace-pre-wrap">
                      {issue.suggestion}
                    </code>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {(!review.issues || review.issues.length === 0) && (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 py-12">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 ring-1 ring-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-zinc-300 font-medium">Clean Code!</p>
            <p className="text-xs text-zinc-500 mt-1">
              No policy violations detected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
