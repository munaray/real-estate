import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BottomTabNavigator() {
  const router = useRouter();

  const tabs = [
    {
      name: 'Home',
      icon: 'home-outline' as const,
      activeIcon: 'home' as const,
      route: '/home',
    },
    {
      name: 'Explore',
      icon: 'search-outline' as const,
      activeIcon: 'search' as const,
      route: '/explore',
    },
    {
      name: 'Profile',
      icon: 'person-outline' as const,
      activeIcon: 'person' as const,
      route: '/profile',
    },
  ];

  const isActive = (route: string) => {
    // Simple check based on current route
    return route === '/explore' ? true : false; // For now, just highlight explore
  };

  return (
    <View className="bg-white border-t border-gray-200 px-6 py-4">
      <View className="flex-row justify-around items-center">
        {tabs.map((tab) => {
          const active = isActive(tab.route);
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => router.push(tab.route)}
              className="items-center"
            >
              <View className={`w-8 h-8 justify-center items-center mb-1 ${
                active ? 'bg-primary-1 rounded-full' : ''
              }`}>
                <Ionicons
                  name={active ? tab.activeIcon : tab.icon}
                  size={20}
                  color={active ? 'white' : '#6B7280'}
                />
              </View>
              <Text
                className={`text-xs ${
                  active ? 'text-primary-1 font-semibold' : 'text-gray-500'
                }`}
                style={{ fontFamily: 'System', fontWeight: active ? '600' : '400' }}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}