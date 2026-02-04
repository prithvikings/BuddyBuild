// Ideally, fetch this from DB. For now, we define the structure.
export interface PersonaConfig {
  id: string;
  name: string;
  role_definition: string; // "You are a Senior Security Engineer..."
  focus_areas: string[];   // ["OWASP Top 10", "SQL Injection"]
  tone: string;            // "Strict", "Educational"
}

export class PromptEngine {
  
  /**
   * Constructs the System Prompt.
   * This is the "God Instruction" that forces the AI into the persona.
   */
  public static buildSystemPrompt(persona: PersonaConfig): string {
    return `
      ROLE: ${persona.role_definition}
      TONE: ${persona.tone}
      
      YOUR TASK:
      Review the provided code focusing strictly on: ${persona.focus_areas.join(', ')}.
      
      OUTPUT FORMAT:
      You must output ONLY valid JSON. No markdown, no preambles.
      
      JSON SCHEMA:
      {
        "summary": "High-level executive summary of the code quality.",
        "issues": [
          {
            "category": "security|performance|maintainability|bug",
            "severity": <integer 1-5>,
            "line_start": <integer>,
            "line_end": <integer>,
            "description": "<concise explanation>",
            "suggestion": "<specific code fix or recommendation>"
          }
        ]
      }
      
      CRITICAL RULES:
      1. Do not halllucinate lines of code.
      2. If code is perfect, return empty issues array.
      3. Be brutal. Do not sugarcoat.
    `.trim();
  }

  /**
   * Constructs the User Message (The Code).
   * We wrap it to prevent "Prompt Injection" (e.g., user putting instructions in comments).
   */
  public static buildUserMessage(code: string): string {
    return `
      --- BEGIN SOURCE CODE ---
      ${code}
      --- END SOURCE CODE ---
      
      Analyze the code above based on your role.
    `.trim();
  }
}