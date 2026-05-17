import { createContext} from "react";
import type { AuthUser } from "../types/auth";

export type AuthContextType = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: unknown | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);
