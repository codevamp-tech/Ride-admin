"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem("qubi_auth");
    if (savedAuth) {
      const auth = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUser(auth.user);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    const userData = { email: data.user.email };

    setIsAuthenticated(true);
    setUser(userData);

    localStorage.setItem("qubi_auth", JSON.stringify({ user: userData }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("qubi_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
