'use client';

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialisation directe depuis localStorage
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error('API URL is not defined. Check .env.local');
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/token`,
      new URLSearchParams({
        username: email,
        password: password,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    const { access_token, refresh_token } = response.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const userData = userResponse.data;
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh-token`, {
        refresh_token: refreshToken,
      });
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      return access_token;
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
