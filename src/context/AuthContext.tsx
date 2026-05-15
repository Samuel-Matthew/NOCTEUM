import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  birthday?: string;
  memberSince: string;
  tier: "silver" | "gold" | "platinum";
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  birthday?: string;
  newsletter?: boolean;
}

export interface ResetData {
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (
    data: ResetData,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Omit<User, "id">>) => void;
}

const AUTH_USER_KEY = "nocteum-auth-user";
const AUTH_USERS_KEY = "nocteum-users";

interface StoredUser extends User {
  password: string;
}

function loadCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
}

function saveCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_USER_KEY);
  }
}

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(AUTH_USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const current = loadCurrentUser();
    setUser(current);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const users = loadUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!found) {
      return { success: false, error: "No account found with this email." };
    }
    if (found.password !== password) {
      return { success: false, error: "Incorrect password." };
    }
    const { password: _, ...userWithoutPassword } = found;
    setUser(userWithoutPassword);
    saveCurrentUser(userWithoutPassword);
    return { success: true };
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    const users = loadUsers();
    if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }
    const newUser: StoredUser = {
      id: `usr-${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      birthday: data.birthday,
      memberSince: new Date().toISOString(),
      tier: "silver",
      password: data.password,
    };
    const updated = [...users, newUser];
    saveUsers(updated);
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    saveCurrentUser(userWithoutPassword);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    saveCurrentUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<Omit<User, "id">>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      saveCurrentUser(updated);
      const users = loadUsers();
      const idx = users.findIndex((u) => u.id === prev.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...data };
        saveUsers(users);
      }
      return updated;
    });
  }, []);

  const resetPassword = useCallback(async (data: ResetData) => {
    const users = loadUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase(),
    );
    if (!found) {
      return { success: false, error: "No account found with this email." };
    }
    return { success: true };
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        resetPassword,
        logout,
        updateProfile,
      }}
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
