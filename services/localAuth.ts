import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
  familyName: string;
  givenName: string;
  isAuthenticated: boolean;
  lastLogin: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

class LocalAuthService {
  private readonly USER_KEY = '@real_scout_user';
  private readonly AUTH_STATUS_KEY = '@real_scout_auth_status';

  // Save user data locally
  async saveUser(userData: Omit<User, 'isAuthenticated' | 'lastLogin'>): Promise<boolean> {
    try {
      const user: User = {
        ...userData,
        isAuthenticated: true,
        lastLogin: new Date().toISOString(),
      };

      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
      await AsyncStorage.setItem(this.AUTH_STATUS_KEY, 'true');

      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(this.USER_KEY);
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const authStatus = await AsyncStorage.getItem(this.AUTH_STATUS_KEY);
      return authStatus === 'true';
    } catch (error) {
      console.error('Error checking auth status:', error);
      return false;
    }
  }

  // Sign out user
  async signOut(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(this.USER_KEY);
      await AsyncStorage.removeItem(this.AUTH_STATUS_KEY);
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      return false;
    }
  }

  // Update user data
  async updateUser(updates: Partial<User>): Promise<boolean> {
    try {
      const currentUser = await this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...updates };
        await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }

  // Clear all stored data
  async clearAllData(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
}

export const localAuthService = new LocalAuthService();