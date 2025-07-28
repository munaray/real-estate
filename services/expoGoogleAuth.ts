import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  photo: string;
  familyName: string;
  givenName: string;
}

export interface GoogleSignInResult {
  success: boolean;
  user?: GoogleUser;
  error?: string;
}

export const useGoogleAuth = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '440082373665-p1c70k95donum35muio3ccmiv4cj0lud.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@munarayd4/real-estate-app',
    scopes: ['profile', 'email'],
    // Add these options for better compatibility
    responseType: 'token',
    shouldAutoExchangeCode: false,
  });

  useEffect(() => {
    console.log('Auth Response:', response);

    if (response?.type === 'success') {
      console.log('Sign-in successful, handling response...');
      handleSignInSuccess(response);
    } else if (response?.type === 'error') {
      console.error('Google Sign-In Error:', response.error);
    } else if (response?.type === 'cancel') {
      console.log('Sign-in was cancelled by user');
    }
  }, [response]);

  const handleSignInSuccess = async (authResponse: any) => {
    try {
      setIsLoading(true);
      const { authentication } = authResponse;

      if (authentication?.accessToken) {
        const userInfo = await getUserInfo(authentication.accessToken);
        if (userInfo) {
          setUser(userInfo);
          return {
            success: true,
            user: userInfo,
          };
        }
      }

      return {
        success: false,
        error: 'Failed to get user information',
      };
    } catch (error: any) {
      console.error('Error handling sign in:', error);
      return {
        success: false,
        error: error.message || 'An unknown error occurred',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInfo = async (accessToken: string): Promise<GoogleUser | null> => {
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.ok) {
        const userData = await response.json();

        return {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          photo: userData.picture,
          familyName: userData.family_name,
          givenName: userData.given_name,
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  };

  const signIn = async (): Promise<GoogleSignInResult> => {
    try {
      setIsLoading(true);
      const result = await promptAsync();

      if (result.type === 'success') {
        return await handleSignInSuccess(result);
      } else if (result.type === 'cancel') {
        return {
          success: false,
          error: 'Sign in was cancelled',
        };
      } else {
        return {
          success: false,
          error: 'Sign in failed',
        };
      }
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      return {
        success: false,
        error: error.message || 'An unknown error occurred',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return {
    user,
    isLoading,
    signIn,
    signOut,
    isSignedIn: !!user,
  };
};