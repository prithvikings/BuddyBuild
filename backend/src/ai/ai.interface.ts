export interface AIReviewResponse {
  review: {
    score: number; // 0-100, calculated by us or suggested by AI? Architecture said AI NEVER computes final scores.
    // Correction: AI returns raw issues. We calculate score. 
    // The interface should reflect raw data extraction.
    summary: string;
    issues: Array<{
      category: 'security' | 'performance' | 'maintainability' | 'bug';
      severity: 1 | 2 | 3 | 4 | 5;
      line_start: number;
      line_end: number;
      description: string;
      suggestion: string;
    }>;
  };
  metadata: {
    model: string;
    tokens_used: number;
    latency_ms: number;
  };
}

export interface IAIProvider {
  /**
   * Generates a code review based on the persona and strict JSON schema.
   * @param code The source code to review
   * @param systemPrompt The persona-specific instructions
   * @param userPrompt Additional context or specific focus
   */
  generateReview(
    code: string, 
    systemPrompt: string
  ): Promise<AIReviewResponse>;
}