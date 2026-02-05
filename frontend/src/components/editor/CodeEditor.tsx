import Editor, { type OnMount } from "@monaco-editor/react";
import { useRef } from "react";

interface CodeEditorProps {
  initialValue: string;
  language?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const CodeEditor = ({
  initialValue,
  language = "javascript",
  onChange,
  disabled = false,
}: CodeEditorProps) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define a custom dark theme that matches our app
    monaco.editor.defineTheme("buddy-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#09090b", // Zinc-950 (Seamless match)
        "editor.foreground": "#e4e4e7", // Zinc-200
        "editor.lineHighlightBackground": "#27272a20",
        "editor.selectionBackground": "#a855f730", // Purple selection
        "editor.inactiveSelectionBackground": "#a855f715",
      },
    });

    monaco.editor.setTheme("buddy-dark");
  };

  return (
    <div className="h-full w-full bg-[#09090b] relative group">
      {/* Subtle top shadow inset for depth */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none" />

      <Editor
        height="100%"
        defaultLanguage={language}
        language={language} // Ensure language updates dynamically
        value={initialValue} // <--- FIX: Controlled Component
        theme="vs-dark" // Will switch to buddy-dark on mount
        onMount={handleEditorDidMount}
        onChange={(value) => onChange(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          fontLigatures: true,
          readOnly: disabled,
          wordWrap: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 24, bottom: 24 }, // Comfortable padding
          renderLineHighlight: "all",
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
        }}
      />
    </div>
  );
};
