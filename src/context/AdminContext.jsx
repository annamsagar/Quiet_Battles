import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_ADMIN_CONFIG, STORAGE_KEYS } from '../utils/constants';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.warn('Failed parsing admin session:', e);
      return null;
    }
  });

  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      }
    } catch (e) {
      console.error('Error persisting admin session:', e);
    }
  }, [session]);

  const login = (email, password) => {
    setAuthError(null);
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (
      cleanEmail === DEMO_ADMIN_CONFIG.email.toLowerCase() &&
      cleanPassword === DEMO_ADMIN_CONFIG.password
    ) {
      const newSession = {
        email: cleanEmail,
        name: DEMO_ADMIN_CONFIG.name,
        role: DEMO_ADMIN_CONFIG.role,
        loginAt: new Date().toISOString(),
        isDemoSession: true,
      };
      setSession(newSession);
      return { success: true };
    } else {
      const errorMsg = 'Invalid demonstration credentials. Please check the prefilled demo email and password.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    setSession(null);
    setAuthError(null);
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated: !!session,
        currentUser: session,
        login,
        logout,
        authError,
        setAuthError,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

