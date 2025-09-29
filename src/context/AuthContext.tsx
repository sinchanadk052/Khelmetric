import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthUser = { id: string; email?: string; name?: string; guest?: boolean } | null;

const AUTH_STORAGE_KEY = 'auth:user';

// In-memory user store (no API). Reset on app reload.
type MemoryUser = { id: string; email: string; password: string; name?: string };
const memoryUsers: MemoryUser[] = [];

type AuthContextType = {
  user: AuthUser;
  loading: boolean;
  login: (opts: { email: string; password: string }) => Promise<void>;
  signup: (opts: { email: string; password: string }) => Promise<void>;
  skip: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (raw) setUser(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (value: AuthUser) => {
    if (value) {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value));
    } else {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const existing = memoryUsers.find((u) => u.email.trim().toLowerCase() === email.trim().toLowerCase());
    if (!existing) throw new Error('User not found. Please sign up.');
    if (existing.password !== password) throw new Error('Invalid password.');
    const loggedIn = { id: existing.id, email: existing.email };
    setUser(loggedIn);
    await persist(loggedIn);
  }, [persist]);

  const signup = useCallback(async ({ email, password }: { email: string; password: string }) => {
    const existing = memoryUsers.find((u) => u.email.trim().toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      if (existing.password === password) {
        // Treat as login if password matches.
        const loggedIn = { id: existing.id, email: existing.email };
        setUser(loggedIn);
        await persist(loggedIn);
        return;
      }
      throw new Error('Email already registered.');
    }
    const id = `user-${Date.now()}`;
    memoryUsers.push({ id, email, password });
    const created = { id, email };
    setUser(created);
    await persist(created);
  }, [persist]);

  const skip = useCallback(async () => {
    const guest = { id: 'guest', guest: true };
    setUser(guest);
    await persist(guest);
  }, [persist]);

  const logout = useCallback(async () => {
    setUser(null);
    await persist(null);
  }, [persist]);

  const value = useMemo(() => ({ user, loading, login, signup, skip, logout }), [user, loading, login, signup, skip, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
