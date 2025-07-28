export interface MockUser {
  id: string;
  name: string;
  email: string;
  photo: string;
  familyName: string;
  givenName: string;
}

export interface MockSignInResult {
  success: boolean;
  user?: MockUser;
  error?: string;
}

export const useMockAuth = () => {
  const signIn = async (): Promise<MockSignInResult> => {
    // Simulate a delay like real authentication
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return mock user data
    const mockUser: MockUser = {
      id: 'mock-user-123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      photo: 'https://via.placeholder.com/150',
      familyName: 'Doe',
      givenName: 'John',
    };

    return {
      success: true,
      user: mockUser,
    };
  };

  const signOut = () => {
    // Mock sign out
    console.log('Mock sign out');
  };

  return {
    signIn,
    signOut,
    isLoading: false,
    user: null,
    isSignedIn: false,
  };
};