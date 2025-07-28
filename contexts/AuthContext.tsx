import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { localAuthService, User } from '../services/localAuth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (userData: Omit<User, 'isAuthenticated' | 'lastLogin'>) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await localAuthService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (userData: Omit<User, 'isAuthenticated' | 'lastLogin'>): Promise<boolean> => {
    try {
      const success = await localAuthService.saveUser(userData);
      if (success) {
        const savedUser = await localAuthService.getCurrentUser();
        setUser(savedUser);
      }
      return success;
    } catch (error) {
      console.error('Error signing in:', error);
      return false;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await localAuthService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUser = async (updates: Partial<User>): Promise<boolean> => {
    try {
      const success = await localAuthService.updateUser(updates);
      if (success) {
        const updatedUser = await localAuthService.getCurrentUser();
        setUser(updatedUser);
      }
      return success;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};