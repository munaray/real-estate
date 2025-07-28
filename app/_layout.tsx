import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FontLoader } from '../components/FontLoader';
import { AuthProvider } from '../contexts/AuthContext';
import '../global.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <FontLoader>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" />
          <Stack.Screen name="get-started" />
          <Stack.Screen name="home" />
          <Stack.Screen name="explore" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="property/[id]" />
        </Stack>
        <StatusBar style="auto" />
      </FontLoader>
    </AuthProvider>
  );
}