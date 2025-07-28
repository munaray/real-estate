import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { GoogleLogo } from '../components/GoogleLogo';
import { localAuthService } from '../services/localAuth';
import { useMockAuth } from '../services/mockAuth';

const { width } = Dimensions.get('window');

export default function GetStartedScreen() {
  const router = useRouter();
  const { signIn, isLoading } = useMockAuth();

  const houses = [
    require('../assets/house1.png'),
    require('../assets/house2.png'),
    require('../assets/house3.png'),
    require('../assets/house4.png'),
    require('../assets/house5.png'),
    require('../assets/house6.png'),
    require('../assets/house7.png'),
    require('../assets/house8.png'),
    require('../assets/house9.png'),
  ];

  const handleGoogleSignUp = async () => {
    try {
      const result = await signIn();

      if (result.success && result.user) {
        // Save user data locally
        const saved = await localAuthService.saveUser(result.user);

        if (saved) {
          // Successfully signed in and saved
          Alert.alert(
            'Welcome!',
            `Welcome to Real Scout, ${result.user.name}!`,
            [
              {
                text: 'Get Started',
                onPress: () => router.replace('/home'),
              },
            ]
          );
        } else {
          Alert.alert('Error', 'Failed to save user data. Please try again.');
        }
      } else {
        Alert.alert('Sign In Error', result.error || 'Authentication failed');
      }
    } catch (error: any) {
      Alert.alert('Sign In Error', error.message || 'An unknown error occurred');
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Status Bar */}
      <View className="h-11 bg-white" />

      {/* Main Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Image Grid */}
        <View className="px-5 pt-8">
          <View className="flex-row flex-wrap justify-center gap-2.5">
            {houses.map((house, index) => {
              // Apply overlay only to bottom row (images 7, 8, 9) - indices 6, 7, 8
              const isBottomRow = index >= 6;

              return (
                <View
                  key={index}
                  className="rounded-[10px] overflow-hidden bg-transparent"
                  style={{
                    width: (width - 50) / 3 - 8,
                    height: index === 2 || index === 5 ? 175 : index === 8 ? 132 : 130,
                  }}
                >
                  <Image
                    source={house}
                    className="w-full h-full"
                    resizeMode="cover"
                    style={{
                      opacity: isBottomRow ? 0.7 : 1, // Reduced opacity more for bottom row
                    }}
                  />
                  {/* Subtle white overlay only on bottom row */}
                  {isBottomRow && (
                    <View
                      className="absolute inset-0 rounded-[10px]"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.25)', // Increased white overlay
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Content Section */}
        <View className="px-5 pt-4 pb-8">
          {/* Welcome Text */}
          <View className="items-center mb-5">
            {/* Welcome to Real Scout - Reduced font size */}
            <Text
              className="text-black-2 text-center mb-3 uppercase mt-6"
              style={{
                fontFamily: 'System',
                fontWeight: '400',
                fontSize: 14, // Reduced from 16
                lineHeight: 20, // Reduced line height
                letterSpacing: 1.2, // Reduced letter spacing
                opacity: 0.75, // Reduced opacity more for text
              }}
            >
              Welcome to Real Scout
            </Text>

            {/* Main heading - Reduced font size */}
            <View className="items-center mb-3">
              <Text
                className="text-black-1 text-center"
                style={{
                  fontFamily: 'System',
                  fontWeight: '600',
                  fontSize: 24, // Reduced from 32
                  lineHeight: 30, // Reduced line height
                  textTransform: 'capitalize',
                  opacity: 0.75, // Reduced opacity more for text
                }}
              >
                Let's get you closer{'\n'}
                <Text style={{ color: '#0061FF', opacity: 0.75 }}>to your ideal home</Text>
              </Text>
            </View>

            {/* Subtitle - Reduced font size */}
            <Text
              className="text-black-2 text-center"
              style={{
                fontFamily: 'System',
                fontWeight: '400',
                fontSize: 16, // Reduced from 18
                lineHeight: 22, // Reduced line height
                opacity: 0.75, // Reduced opacity more for text
              }}
            >
              Login to Real Scout with Google
            </Text>
          </View>

          {/* Google Sign Up Button */}
          <TouchableOpacity
            onPress={handleGoogleSignUp}
            disabled={isLoading}
            className="flex-row items-center justify-center bg-white border border-primary-3 rounded-[30px] py-[18px] px-8 shadow-lg mt-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 120,
              elevation: 8,
              opacity: isLoading ? 0.7 : 1, // Dim button when loading
            }}
          >
            <GoogleLogo width={22} height={22} />
            <Text
              className="text-black-1 ml-2.5"
              style={{
                fontFamily: 'System',
                fontWeight: '500',
                fontSize: 16, // Reduced from 18
                lineHeight: 20, // Reduced line height
                opacity: 1, // Keep button text fully opaque
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign Up with Google'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}