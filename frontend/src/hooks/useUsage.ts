import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/client";

interface UsageData {
  total: number;
  consumed: number;
  remaining: number;
}

export const useUsage = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      const { data } = await apiClient.get<UsageData>("/usage/limits");
      return data;
    },
    refetchOnWindowFocus: true, // Update if they come back to tab
  });

  // Helper to force update (call this after a review submits)
  const refreshUsage = () => {
    queryClient.invalidateQueries({ queryKey: ["usage"] });
  };

  return { ...query, refreshUsage };
};
