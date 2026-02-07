import React, { createContext, useContext, useState, useEffect } from 'react';
import appwriteService from '../services/appwrite';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await appwriteService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const session = await appwriteService.login(email, password);
    const userData = await appwriteService.getCurrentUser();
    setUser(userData);
    return session;
  };

  const logout = async () => {
    await appwriteService.logout();
    setUser(null);
  };

  const register = async (email, password, name) => {
    const session = await appwriteService.createAccount(email, password, name);
    const userData = await appwriteService.getCurrentUser();
    setUser(userData);
    return session;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
