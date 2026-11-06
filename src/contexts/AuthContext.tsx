import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar?: string;
  role: string;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface RegisterData {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "auth_user";
const USERS_KEY = "registered_users";

function getStoredUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getStoredPasswords(): Record<string, string> {
  try {
    const data = localStorage.getItem("user_passwords");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function savePasswords(passwords: Record<string, string>) {
  localStorage.setItem("user_passwords", JSON.stringify(passwords));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (identifier: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600));

    const users = getStoredUsers();
    const passwords = getStoredPasswords();

    // Also allow demo account
    const demoUser: User = {
      id: "demo-001",
      fullName: "Alex Johnson",
      username: "alexj",
      email: "alex@example.com",
      role: "Administrator",
      joinedAt: "2024-01-15",
    };

    const isDemo =
      (identifier === "alex@example.com" || identifier === "alexj") &&
      password === "Password123!";

    if (isDemo) {
      setUser(demoUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
      return { success: true };
    }

    const found = users.find(
      (u) => u.email === identifier || u.username === identifier
    );

    if (!found) {
      return { success: false, error: "No account found with that email or username." };
    }

    if (passwords[found.id] !== password) {
      return { success: false, error: "Incorrect password. Please try again." };
    }

    setUser(found);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    return { success: true };
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    await new Promise((r) => setTimeout(r, 800));

    const users = getStoredUsers();
    const passwords = getStoredPasswords();

    if (users.find((u) => u.email === data.email)) {
      return { success: false, error: "An account with this email already exists." };
    }
    if (users.find((u) => u.username === data.username)) {
      return { success: false, error: "This username is already taken." };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      role: "Member",
      joinedAt: new Date().toISOString().split("T")[0],
    };

    users.push(newUser);
    passwords[newUser.id] = data.password;

    saveUsers(users);
    savePasswords(passwords);

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
