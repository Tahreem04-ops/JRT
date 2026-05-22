import { createContext, useContext, useEffect, useState, ReactNode } from "react";
export type Role = "student" | "instructor";
export interface User {
  fullName: string;
  email: string;
  role: Role;
  verified: boolean;
}
interface AuthContextValue {
  user: User | null;
  pendingEmail: string | null;
  signUp: (data: { fullName: string; email: string; password: string; role: Role }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  verify: (code: string) => Promise<boolean>;
  setPendingEmail: (email: string | null) => void;
  requestPasswordReset: (email: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_USERS = "jrt_users";
const STORAGE_SESSION = "jrt_session";
interface StoredUser extends User {
  password: string;
}
function loadUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]");
  } catch {
    return [];
  }
}
function saveUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_SESSION);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_SESSION);
      }
    }
  }, []);
  const signUp: AuthContextValue["signUp"] = async ({ fullName, email, password, role }) => {
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }
    const newUser: StoredUser = { fullName, email, password, role, verified: false };
    users.push(newUser);
    saveUsers(users);
    setPendingEmail(email);
  };
  const signIn: AuthContextValue["signIn"] = async (email, password) => {
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) throw new Error("No account found with this email.");
    if (found.password !== password) throw new Error("Incorrect password.");
    if (!found.verified) {
      setPendingEmail(found.email);
      throw new Error("Please verify your email before signing in.");
    }
    const session: User = {
      fullName: found.fullName,
      email: found.email,
      role: found.role,
      verified: found.verified,
    };
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    setUser(session);
  };
  const signOut = () => {
    localStorage.removeItem(STORAGE_SESSION);
    setUser(null);
  };
  const verify: AuthContextValue["verify"] = async (code) => {
    if (!pendingEmail) return false;
    if (code !== "123456") return false;
    const users = loadUsers();
    const idx = users.findIndex((u) => u.email === pendingEmail);
    if (idx === -1) return false;
    users[idx].verified = true;
    saveUsers(users);
    const session: User = {
      fullName: users[idx].fullName,
      email: users[idx].email,
      role: users[idx].role,
      verified: true,
    };
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    setUser(session);
    setPendingEmail(null);
    return true;
  };

  const requestPasswordReset: AuthContextValue["requestPasswordReset"] = async (email) => {
    const users = loadUsers();
    if (!users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("No account found with this email.");
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, pendingEmail, signUp, signIn, signOut, verify, setPendingEmail, requestPasswordReset }}>
     {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
