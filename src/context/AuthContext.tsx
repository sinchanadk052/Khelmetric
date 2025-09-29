import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthUser = { id: string; name?: string; guest?: boolean } | null;

const AUTH_STORAGE_KEY = 'auth:user';

type AuthContextType = {
  user: AuthUser;
  loading: boolean;
  login: (opts?: { name?: string }) => Promise<void>;
  signup: (opts?: { name?: string }) => Promise<void>;
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

  const login = useCallback(async (opts?: { name?: string }) => {
    const dummy = { id: 'user-1', name: opts?.name || 'User' };
    setUser(dummy);
    await persist(dummy);
  }, [persist]);

  const signup = useCallback(async (opts?: { name?: string }) => {
    const dummy = { id: 'user-1', name: opts?.name || 'New User' };
    setUser(dummy);
    await persist(dummy);
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
