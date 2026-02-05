import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { apiClient } from "../api/client";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check session on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await apiClient.get("/auth/me");
        if (data.authenticated) {
          setUser(data.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
