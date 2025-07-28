import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';

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

class ExpoGoogleSignInService {
  private discovery: AuthSession.DiscoveryDocument;

  constructor() {
    this.discovery = {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    };
  }

  async signIn(): Promise<GoogleSignInResult> {
    try {
      // Create the auth request
      const request = new AuthSession.AuthRequest({
        clientId: 'your_google_web_client_id_here', // Replace with your web client ID
        scopes: ['openid', 'profile', 'email'],
        redirectUri: AuthSession.makeRedirectUri({
          scheme: 'real-estate-app',
        }),
        responseType: AuthSession.ResponseType.Code,
        codeChallenge: await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          'challenge',
          { encoding: Crypto.CryptoEncoding.HEX }
        ),
        codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
      });

      // Start the auth session
      const result = await request.promptAsync(this.discovery);

      if (result.type === 'success' && result.params.code) {
        // Exchange code for tokens
        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            clientId: 'your_google_web_client_id_here', // Replace with your web client ID
            code: result.params.code,
            redirectUri: AuthSession.makeRedirectUri({
              scheme: 'real-estate-app',
            }),
            extraParams: {
              code_verifier: 'challenge', // In production, use a proper code verifier
            },
          },
          this.discovery
        );

        if (tokenResult.accessToken) {
          // Get user info using the access token
          const userInfo = await this.getUserInfo(tokenResult.accessToken);

          if (userInfo) {
            return {
              success: true,
              user: userInfo,
            };
          }
        }
      }

      return {
        success: false,
        error: 'Authentication was cancelled or failed',
      };
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      return {
        success: false,
        error: error.message || 'An unknown error occurred',
      };
    }
  }

  private async getUserInfo(accessToken: string): Promise<GoogleUser | null> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
      );

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
  }

  async signOut(): Promise<boolean> {
    try {
      // For Expo auth session, we just clear any stored tokens
      // The actual sign out happens on Google's side
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      return false;
    }
  }
}

export const expoGoogleSignInService = new ExpoGoogleSignInService();