// src/components/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { apiClient } from './test3';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initial check for existing session on app load
    const appSessionKey = window.btoa('app_session_data');
    const sessionData = localStorage.getItem(appSessionKey);
    if (sessionData) {
      try {
        const parsedData = JSON.parse(atob(sessionData));
        if (parsedData.auth && parsedData.auth.jwt && parsedData.user) {
          setIsAuthenticated(true);
          setUser(parsedData.user);
        }
      } catch (e) {
        console.error('Error restoring session:', e);
        localStorage.removeItem(appSessionKey);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, pass: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call to login
      const response = await apiClient.post('/auth/login', { username, password: pass });
      if (response.data && response.data.token && response.data.user) {
        const appSessionKey = window.btoa('app_session_data');
        const sessionPayload = {
          auth: { jwt: response.data.token }, // VULNERABLE: JWT token included in payload
          user: { username: response.data.user.username },
          lastLogin: new Date().toISOString(),
        };
        // VULNERABLE SET ITEM: Storing the obfuscated token payload in localStorage
        localStorage.setItem(appSessionKey, btoa(JSON.stringify(sessionPayload)));
        setIsAuthenticated(true);
        setUser({ username: response.data.user.username });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    const appSessionKey = window.btoa('app_session_data');
    localStorage.removeItem(appSessionKey); // Clears the insecurely stored token
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};