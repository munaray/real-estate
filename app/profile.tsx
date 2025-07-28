import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomTabNavigator from '../components/BottomTabNavigator';
import { useRouter } from 'expo-router';

// Hardcoded user data
const user = {
  name: "Abdulsalam Sa'ad",
  givenName: 'Abdulsalam',
  familyName: "Sa'ad",
  email: 'abdulsalam@example.com',
  photo: '', // Leave empty for initials avatar
};

function ProfileScreen() {
  const router = useRouter();
  // Profile actions list
  const actions = [
    { label: 'My Booking', icon: 'calendar-outline' as const, onPress: () => {} },
    { label: 'Payments', icon: 'wallet-outline' as const, onPress: () => {} },
    { label: 'Profile', icon: 'person-outline' as const, onPress: () => {} },
    { label: 'Notification', icon: 'notifications-outline' as const, onPress: () => {} },
    { label: 'Security', icon: 'shield-checkmark-outline' as const, onPress: () => {} },
    { label: 'Language', icon: 'language-outline' as const, onPress: () => {} },
    { label: 'Help Center', icon: 'help-circle-outline' as const, onPress: () => {} },
    { label: 'Invite Friends', icon: 'people-outline' as const, onPress: () => {} },
  ];

  const handleSignOut = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => router.replace('/get-started'),
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-12 pb-2">
          <Text className="text-black-1 text-2xl font-extrabold" style={{ fontFamily: 'Rubik', fontWeight: '700' }}>Profile</Text>
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full justify-center items-center shadow-sm border border-gray-100">
            <Ionicons name="notifications-outline" size={22} color="#0061FF" />
          </TouchableOpacity>
        </View>
        {/* Profile Avatar and Name */}
        <View className="items-center mt-2 mb-6">
          <View className="relative">
            {user.photo ? (
              <Image
                source={{ uri: user.photo }}
                className="w-28 h-28 rounded-full bg-gray-200"
              />
            ) : (
              <View className="w-28 h-28 rounded-full bg-primary-1 justify-center items-center">
                <Text className="text-white text-3xl font-bold" style={{ fontFamily: 'Rubik', fontWeight: '700' }}>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                  }
                </Text>
              </View>
            )}
            <TouchableOpacity className="absolute bottom-2 right-2 bg-blue-600 w-8 h-8 rounded-full justify-center items-center border-4 border-white">
              <Ionicons name="pencil" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text className="mt-4 text-xl font-extrabold text-black-1" style={{ fontFamily: 'Rubik', fontWeight: '700' }}>{user.name}</Text>
        </View>
        {/* Divider */}
        <View className="h-px bg-gray-200 mx-6 mb-2" />
        {/* Actions List */}
        <View className="bg-white px-2">
          {actions.map((action, idx) => (
            <TouchableOpacity
              key={action.label}
              className={`flex-row items-center py-4 px-4 ${idx !== actions.length - 1 ? 'border-b border-gray-100' : ''}`}
              onPress={action.onPress}
            >
              <Ionicons name={action.icon} size={22} color="#191D31" style={{ width: 32 }} />
              <Text className="flex-1 text-base text-black-1 ml-2 font-semibold" style={{ fontFamily: 'Rubik', fontWeight: '500' }}>{action.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#8C8E98" />
            </TouchableOpacity>
          ))}
          {/* Logout */}
          <TouchableOpacity className="flex-row items-center py-4 px-4" onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color="#F75555" style={{ width: 32 }} />
            <Text className="flex-1 text-base ml-2 font-semibold" style={{ color: '#F75555', fontFamily: 'Rubik', fontWeight: '500' }}>Logout</Text>
          </TouchableOpacity>
        </View>
        {/* Add some bottom padding so content doesn't hide behind tab bar */}
        <View style={{ height: 32 }} />
      </ScrollView>
      {/* Bottom Tab Navigator */}
      <BottomTabNavigator />
    </View>
  );
}

export default ProfileScreen;