import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => authService.getCachedUser());
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verify stored session on mount against /api/v1/auth/me
  useEffect(() => {
    const verifySession = async () => {
      if (authService.hasToken()) {
        try {
          const profile = await authService.getCurrentAdmin();
          setCurrentUser((prev) => ({ ...prev, ...profile }));
        } catch (err) {
          console.warn('Session verification failed on mount:', err?.message);
          // Token expired or invalid
          authService.logout();
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const data = await authService.login(email, password);
      setCurrentUser(data);
      return { success: true, data };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Authentication failed. Please verify your administrator credentials.';
      setAuthError(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setAuthError(null);
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated: !!currentUser,
        currentUser,
        login,
        logout,
        authError,
        setAuthError,
        loading,
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
