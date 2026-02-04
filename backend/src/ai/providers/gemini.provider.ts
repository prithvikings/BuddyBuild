import { GoogleGenAI } from "@google/genai";
import { IAIProvider, AIReviewResponse } from "../ai.interface";
import { config } from "../../config/env";

export class GeminiProvider implements IAIProvider {
  private client: GoogleGenAI;

  constructor() {
    this.client = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });
  }

  async generateReview(
    code: string,
    systemPrompt: string,
  ): Promise<AIReviewResponse> {
    const startTime = Date.now();

    try {
      // 1. Define Schema using standard JSON Schema format (no SchemaType enum needed)
      const responseSchema = {
        type: "OBJECT",
        properties: {
          summary: { type: "STRING" },
          issues: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                category: {
                  type: "STRING",
                  enum: ["security", "performance", "maintainability", "bug"],
                },
                severity: { type: "INTEGER" },
                line_start: { type: "INTEGER" },
                line_end: { type: "INTEGER" },
                description: { type: "STRING" },
                suggestion: { type: "STRING" },
              },
              required: ["category", "severity", "description", "suggestion"],
            },
          },
        },
        required: ["summary", "issues"],
      };

      // 2. Call the API
      const response = await this.client.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
          temperature: 0.2,
          systemInstruction: systemPrompt,
        },
        contents: [
          {
            role: "user",
            parts: [{ text: code }],
          },
        ],
      });

      // 3. Safe Text Extraction (New SDK uses .text() method or accessor)
      const responseText = response.text || null;

      if (!responseText) {
        throw new Error("Empty response from AI");
      }

      // 4. Parse & Sanitize
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch (e) {
        console.error("Raw AI Response:", responseText);
        throw new Error("AI returned invalid JSON");
      }

      const sanitizedIssues = (parsed.issues || []).map((issue: any) => ({
        ...issue,
        category: issue.category || "maintainability",
        severity: Math.max(1, Math.min(5, issue.severity || 1)),
        line_start: issue.line_start || 0,
        line_end: issue.line_end || 0,
      }));

      return {
        review: {
          score: -1, // Placeholder: Worker calculates the real score based on issues
          summary: parsed.summary || "No summary provided.",
          issues: sanitizedIssues,
        },
        metadata: {
          model: "gemini-2.5-flash",
          tokens_used: response.usageMetadata?.totalTokenCount || 0,
          latency_ms: Date.now() - startTime,
        },
      };
    } catch (error) {
      console.error("[AI Provider Error]", error);
      throw error;
    }
  }
}
