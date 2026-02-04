import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";

export interface HistoryItem {
  id: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  calculated_score: number;
  language: string;
  created_at: string;
  persona_name: string;
}

export const useReviewHistory = () => {
  return useQuery({
    queryKey: ["review-history"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: HistoryItem[] }>(
        "/reviews/history",
      );
      return data.data;
    },
  });
};
