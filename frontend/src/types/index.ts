export interface ReviewIssue {
  id: string;
  category: "security" | "performance" | "maintainability" | "bug";
  severity: 1 | 2 | 3 | 4 | 5;
  line_start: number;
  line_end: number;
  description: string;
  suggestion: string;
}

export interface CodeReview {
  id: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  code_snippet: string;
  language?: string;
  calculated_score?: number;
  summary?: string;
  issues?: ReviewIssue[];
  created_at: string;
}

export interface ReviewResponse {
  message: string;
  reviewId: string;
  status: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string; // Matches Backend DB column
}
