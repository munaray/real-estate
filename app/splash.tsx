import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '../components/Logo';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    // Create a sequence of animations
    Animated.sequence([
      // Fade in and scale up the logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Slide up the text
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      // Wait a bit then navigate
      Animated.timing(new Animated.Value(0), {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to GetStarted screen after animation completes
      setTimeout(() => {
        router.replace('/get-started');
      }, 1000);
    });
  }, [router]);

  return (
    <View className="flex-1 bg-white">
      {/* Status Bar */}
      <View className="h-11 bg-white" />

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-20">
        {/* Logo Container */}
        <Animated.View
          className="items-center mb-3"
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {/* Logo */}
          <View className="mb-3">
            <Logo width={134} height={113} />
          </View>

          {/* Title and Subtitle */}
          <Animated.View
            className="items-center"
            style={{
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text
              className="text-primary-1 text-center mb-2.5"
              style={{
                fontFamily: 'System',
                fontWeight: '900',
                fontSize: 18, // Reduced from 20
                letterSpacing: 1.5, // Reduced from 2
                textTransform: 'uppercase',
              }}
            >
              Real Scout
            </Text>
            <Text
              className="text-black-2 text-center"
              style={{
                fontFamily: 'System',
                fontWeight: '500',
                fontSize: 11, // Reduced from 12
                letterSpacing: 1, // Reduced from 1.2
                textTransform: 'uppercase',
              }}
            >
              Connecting You to Your Ideal Home.
            </Text>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}