import { useState, useEffect } from "react";
import { CodeEditor } from "../components/editor/CodeEditor";
import { ReviewResult } from "../components/review/ReviewResult";
import {
  Play,
  Loader2,
  LogOut,
  ChevronDown,
  Handshake,
  Zap,
  Cpu,
  ShieldCheck,
  Terminal,
  PanelLeft,
  User,
  Languages,
} from "lucide-react";
import { apiClient } from "../api/client";
import { useReviewPolling } from "../hooks/useReviewPolling";
import { useAuth } from "../context/AuthContext";
import { useUsage } from "../hooks/useUsage";
import { useReviewHistory } from "../hooks/useReviewHistory";
import { HistorySidebar } from "../components/layout/HistorySidebar";

// Options Configuration
const LANGUAGES = [
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "go", name: "Go" },
];

const PERSONAS = [
  { id: "strict-senior", name: "Strict Senior", icon: Terminal },
  { id: "security-engineer", name: "Security Eng", icon: ShieldCheck },
  { id: "performance-engineer", name: "Performance", icon: Zap },
  { id: "junior-mentor", name: "Junior Mentor", icon: User },
];

export const EditorPage = () => {
  const { user, logout } = useAuth();

  const { data: usageData, refreshUsage } = useUsage();
  const { data: history, refetch: refetchHistory } = useReviewHistory();

  // State
  const [code, setCode] = useState<string>(
    "// Paste your code here to review...",
  );
  const [language, setLanguage] = useState("javascript");
  const [persona, setPersona] = useState("strict-senior");
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);

  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Polling Hook
  const { data: reviewData } = useReviewPolling(activeReviewId);

  // Sync Code & Language when a review loads (History click)
  useEffect(() => {
    if (reviewData) {
      if (reviewData.code_snippet) {
        setCode(reviewData.code_snippet);
      }
      if (reviewData.language) {
        setLanguage(reviewData.language);
      }
    }
  }, [reviewData]);

  const isAnalyzing =
    activeReviewId &&
    reviewData?.status !== "COMPLETED" &&
    reviewData?.status !== "FAILED";

  const handleAnalyze = async () => {
    if (!code) return;
    setActiveReviewId(null);

    try {
      const { data } = await apiClient.post("/reviews", {
        code,
        language,
        personaKey: persona,
      });
      setActiveReviewId(data.reviewId);
      refreshUsage();
      setTimeout(() => refetchHistory(), 1000);
    } catch (error) {
      alert("Failed to submit review");
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-zinc-100 overflow-hidden font-sans selection:bg-purple-500/30">
      {/* 1. SIDEBAR WRAPPER */}
      <aside
        className={`flex-shrink-0 bg-[#050505] border-r border-white/5 transition-[width,opacity] duration-300 ease-in-out overflow-hidden ${
          isSidebarOpen ? "w-64 opacity-100" : "w-0 opacity-0 border-r-0"
        }`}
      >
        <div className="w-64 h-full">
          <HistorySidebar
            history={history || []}
            selectedId={activeReviewId}
            onSelect={setActiveReviewId}
          />
        </div>
      </aside>

      {/* 2. MIDDLE PANEL: Editor */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#09090b] relative">
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#a1a1aa 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md z-20 gap-4">
          {/* LEFT GROUP: Toggle + Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 text-zinc-500 hover:text-zinc-100 hover:bg-white/10 rounded-md transition-colors"
            >
              <PanelLeft className="w-5 h-5" />
            </button>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-900 border border-white/10 rounded-lg flex items-center justify-center">
                <Handshake className="w-4 h-4 text-purple-400" />
              </div>
              <div
                className={`flex flex-col ${isSidebarOpen ? "hidden xl:flex" : "flex"}`}
              >
                <span className="text-sm font-semibold tracking-tight text-zinc-100">
                  BuddyBuild
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  v1.2.0
                </span>
              </div>
            </div>
          </div>

          {/* CENTER GROUP: Controls (Scrollable on tiny screens, clamped on others) */}
          <div className="flex items-center justify-center gap-3 flex-1 min-w-0">
            {/* Language Selector (Compacted) */}
            <div className="relative group min-w-[120px] max-w-[160px] hidden sm:block">
              <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none">
                <Languages className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full appearance-none pl-9 pr-8 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 font-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-colors cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Persona Selector (Compacted) */}
            <div className="relative group min-w-[140px] max-w-[180px] hidden md:block">
              <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none">
                <User className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="w-full appearance-none pl-9 pr-8 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 font-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-colors cursor-pointer"
              >
                {PERSONAS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Run Button (Always Visible) */}
            <button
              onClick={handleAnalyze}
              disabled={!!isAnalyzing}
              className={`
                flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 border
                ${
                  isAnalyzing
                    ? "bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-500 border-purple-500 hover:border-purple-400 text-white cursor-pointer active:scale-95"
                }
              `}
            >
              {isAnalyzing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              <span className="hidden sm:inline">
                {isAnalyzing ? "Processing..." : "Review Code"}
              </span>
              <span className="sm:hidden">{isAnalyzing ? "..." : "Run"}</span>
            </button>
          </div>

          {/* RIGHT GROUP: User Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {" "}
            {/* Fixed class */}
            {usageData && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800/50">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${usageData.remaining > 0 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500"}`}
                />
                <span className="text-[10px] font-mono text-zinc-400">
                  {usageData.remaining} cr
                </span>
              </div>
            )}
            <div className="flex items-center gap-3 pl-3 border-l border-white/5">
              {/* Use avatar_url here */}
              <img
                src={user?.avatar_url}
                alt="User"
                className="w-8 h-8 rounded-full border border-white/10 bg-zinc-800 object-cover"
              />
              <button
                onClick={logout}
                className="text-zinc-500 hover:text-white transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* EDITOR AREA */}
        <main className="flex-1 relative z-10">
          <CodeEditor
            initialValue={code}
            language={language}
            onChange={setCode}
            disabled={!!isAnalyzing}
          />
        </main>
      </div>

      {/* 3. RIGHT PANEL: Results (Reduced Width for better fit) */}
      <div className="w-[400px] bg-[#0A0A0A] flex flex-col border-l border-white/5 flex-shrink-0 relative overflow-hidden transition-all">
        {/* Panel Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0A0A0A]">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Output
          </span>
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700" />
          </div>
        </div>

        {isAnalyzing && (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-8 relative">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border border-purple-500/20 animate-[spin_4s_linear_infinite]" />
              <div className="w-24 h-24 rounded-full border border-t-purple-500/80 absolute top-0 left-0 animate-[spin_2s_linear_infinite]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-2 z-10">
              <h3 className="text-sm font-medium text-zinc-200">
                Running Policy
              </h3>
              <p className="text-xs text-zinc-500 font-mono">
                Agent: <span className="text-purple-400">{persona}</span>
              </p>
            </div>
          </div>
        )}

        {!isAnalyzing && reviewData && (
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <ReviewResult review={reviewData} />
          </div>
        )}

        {!isAnalyzing && !reviewData && (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 opacity-80">
            <div className="w-16 h-16 bg-zinc-900 rounded-2xl border border-dashed border-zinc-800 flex items-center justify-center mb-4">
              <Terminal className="w-8 h-8 text-zinc-700" />
            </div>
            <p className="text-sm font-medium text-zinc-500">Ready to review</p>
            <p className="text-xs text-zinc-700 mt-1">
              Select an agent and click run
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
