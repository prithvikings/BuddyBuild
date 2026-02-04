import type { HistoryItem } from "../../hooks/useReviewHistory";
import { Clock, Loader2, FileCode2, History } from "lucide-react";

interface Props {
  history: HistoryItem[];
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export const HistorySidebar = ({ history, onSelect, selectedId }: Props) => {
  return (
    <div className="w-64 bg-[#050505] border-r border-white/5 flex flex-col flex-shrink-0 z-20">
      {/* 1. Header with subtle depth */}
      <div className="h-16 flex items-center px-4 border-b border-white/5 bg-[#050505]/50 backdrop-blur-sm">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <History className="w-3.5 h-3.5" />
          Review History
        </h2>
      </div>

      {/* 2. Scrollable List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {/* Empty State */}
        {history.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-center text-center px-4 opacity-50">
            <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-3 border border-white/5">
              <Clock className="w-5 h-5 text-zinc-600" />
            </div>
            <p className="text-xs text-zinc-500 font-medium">No reviews yet</p>
            <p className="text-[10px] text-zinc-600 mt-1">
              Run an analysis to build history.
            </p>
          </div>
        )}

        {/* History Items */}
        {history.map((item) => {
          const isSelected = selectedId === item.id;
          const score = item.calculated_score;

          // Score Logic for Colors
          let scoreColor = "text-zinc-500";
          let scoreBg = "bg-zinc-800";

          if (item.status === "COMPLETED") {
            if (score >= 90) {
              scoreColor = "text-emerald-400";
              scoreBg = "bg-emerald-500/10 border-emerald-500/20";
            } else if (score >= 70) {
              scoreColor = "text-blue-400";
              scoreBg = "bg-blue-500/10 border-blue-500/20";
            } else if (score >= 50) {
              scoreColor = "text-yellow-400";
              scoreBg = "bg-yellow-500/10 border-yellow-500/20";
            } else {
              scoreColor = "text-red-400";
              scoreBg = "bg-red-500/10 border-red-500/20";
            }
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`
                  group relative w-full text-left p-3 rounded-lg border transition-all duration-200
                  ${
                    isSelected
                      ? "bg-zinc-900 border-white/10 shadow-sm"
                      : "bg-transparent border-transparent hover:bg-zinc-900/50 hover:border-white/5"
                  }
                `}
            >
              {/* Active Indicator Bar (Left) */}
              {isSelected && (
                <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-purple-500 rounded-r-full" />
              )}

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileCode2
                    className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? "text-purple-400" : "text-zinc-600 group-hover:text-zinc-500"}`}
                  />
                  <span
                    className={`text-xs font-medium truncate ${isSelected ? "text-zinc-200" : "text-zinc-400 group-hover:text-zinc-300"}`}
                  >
                    {item.persona_name}
                  </span>
                </div>

                {/* Status / Score Badge */}
                {item.status === "COMPLETED" ? (
                  <div
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${scoreBg} ${scoreColor}`}
                  >
                    {score}
                  </div>
                ) : item.status === "FAILED" ? (
                  <span className="text-[10px] font-bold text-red-500">
                    FAIL
                  </span>
                ) : (
                  <Loader2 className="w-3 h-3 animate-spin text-purple-500" />
                )}
              </div>

              <div className="flex items-center justify-between pl-5.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-semibold text-zinc-600 group-hover:text-zinc-500 transition-colors">
                    {item.language}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-600 tabular-nums">
                  {new Date(item.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Bottom Gradient Fade (Optional aesthetic touch) */}
      <div className="h-4 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </div>
  );
};
