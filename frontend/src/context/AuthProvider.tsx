import { useEffect, useState, type ReactNode } from "react";
import type { AuthUser } from "../types/auth";
import { AuthContext } from "./AuthContext";
import { getUserService } from "../services/authServices";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserService();

        if (response && response.user) {
          setUser(response.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setError(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
