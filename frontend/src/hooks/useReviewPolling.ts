import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import type { CodeReview } from "../types";

export const useReviewPolling = (reviewId: string | null) => {
  return useQuery({
    queryKey: ["review", reviewId],
    queryFn: async () => {
      if (!reviewId) return null;
      const { data } = await apiClient.get<{ data: CodeReview }>(
        `/reviews/${reviewId}`,
      );
      return data.data;
    },
    enabled: !!reviewId, // Only run if we have an ID
    refetchInterval: (query) => {
      // If completed or failed, stop polling (return false)
      // Otherwise, check every 2 seconds
      const status = query.state.data?.status;
      if (status === "COMPLETED" || status === "FAILED") {
        return false;
      }
      return 2000;
    },
    refetchOnWindowFocus: false, // Don't spam server if user tabs out
  });
};
