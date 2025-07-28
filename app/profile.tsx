import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import BottomTabNavigator from '../components/BottomTabNavigator';
import { localAuthService, User } from '../services/localAuth';
import { Ionicons } from '@expo/vector-icons';

function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await localAuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.replace('/get-started');
      }
    } catch (error) {
      router.replace('/get-started');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await localAuthService.signOut();
              router.replace('/get-started');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-black-1 text-lg">Loading...</Text>
      </View>
    );
  }

  if (!user) return null;

  // Profile actions list
  const actions: { label: string; icon: any; onPress: () => void }[] = [
    { label: 'My Booking', icon: 'calendar-outline', onPress: () => {} },
    { label: 'Payments', icon: 'wallet-outline', onPress: () => {} },
    { label: 'Profile', icon: 'person-outline', onPress: () => {} },
    { label: 'Notification', icon: 'notifications-outline', onPress: () => {} },
    { label: 'Security', icon: 'shield-checkmark-outline', onPress: () => {} },
    { label: 'Language', icon: 'language-outline', onPress: () => {} },
    { label: 'Help Center', icon: 'help-circle-outline', onPress: () => {} },
    { label: 'Invite Friends', icon: 'people-outline', onPress: () => {} },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Status Bar */}
      <View className="h-11 bg-white" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <Text className="text-black-1 text-xl font-bold" style={{ fontFamily: 'Rubik', fontWeight: '600' }}>Profile</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={26} color="#191D31" />
          </TouchableOpacity>
        </View>
        {/* Profile Avatar and Name */}
        <View className="items-center mt-2 mb-6">
          <View className="relative">
            {user.photo ? (
              <Image source={{ uri: user.photo }} className="w-32 h-32 rounded-full" />
            ) : (
              <View className="w-32 h-32 rounded-full bg-blue-100 justify-center items-center">
                <Text className="text-3xl text-blue-700 font-bold">{user.givenName?.[0] || user.name?.[0] || 'U'}</Text>
              </View>
            )}
            <TouchableOpacity className="absolute bottom-2 right-2 bg-blue-600 w-9 h-9 rounded-full justify-center items-center border-4 border-white">
              <Ionicons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text className="mt-4 text-xl font-bold text-black-1" style={{ fontFamily: 'Rubik', fontWeight: '600' }}>{user.name}</Text>
        </View>
        {/* Actions List */}
        <View className="bg-white px-5">
          {actions.map((action, idx) => (
            <TouchableOpacity
              key={action.label}
              className="flex-row items-center py-4 border-b border-gray-100"
              onPress={action.onPress}
            >
              <Ionicons name={action.icon} size={24} color="#191D31" style={{ width: 32 }} />
              <Text className="flex-1 text-base text-black-1 ml-2" style={{ fontFamily: 'Rubik', fontWeight: '500' }}>{action.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#8C8E98" />
            </TouchableOpacity>
          ))}
          {/* Logout */}
          <TouchableOpacity className="flex-row items-center py-4" onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={24} color="#F75555" style={{ width: 32 }} />
            <Text className="flex-1 text-base ml-2" style={{ color: '#F75555', fontFamily: 'Rubik', fontWeight: '500' }}>Logout</Text>
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