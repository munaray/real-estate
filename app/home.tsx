import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BottomTabNavigator from '../components/BottomTabNavigator';

const { width } = Dimensions.get('window');

// Mock data for featured properties
const featuredProperties = [
  {
    id: 1,
    name: 'Merialla Villa',
    location: 'New York, US',
    price: '$12,219',
    rating: 4.8,
    image: require('../assets/house1.png'),
    type: 'Villa',
  },
  {
    id: 2,
    name: 'Modernica A',
    location: 'New York, US',
    price: '$22,452',
    rating: 4.6,
    image: require('../assets/house2.png'),
    type: 'Apartment',
  },
  {
    id: 3,
    name: 'Luxury Penthouse',
    location: 'Los Angeles, US',
    price: '$18,500',
    rating: 4.9,
    image: require('../assets/house3.png'),
    type: 'Apartment',
  },
  {
    id: 4,
    name: 'Cozy Family House',
    location: 'Chicago, US',
    price: '$15,800',
    rating: 4.7,
    image: require('../assets/house4.png'),
    type: 'House',
  },
  {
    id: 5,
    name: 'Beachfront Resort',
    location: 'Miami, US',
    price: '$28,900',
    rating: 4.9,
    image: require('../assets/house5.png'),
    type: 'Other',
  },
];

// Mock data for recommendations
const recommendedProperties = [
  {
    id: 1,
    name: 'La Grand Maison',
    location: 'Tokyo, Japan',
    price: '$12,219',
    rating: 4.5,
    image: require('../assets/house4.png'),
    type: 'House',
  },
  {
    id: 2,
    name: 'Modern Kitchen',
    location: 'Tokyo, Japan',
    price: '$1,424',
    rating: 4.8,
    image: require('../assets/house5.png'),
    type: 'Apartment',
  },
  {
    id: 3,
    name: 'Dining Villa',
    location: 'Tokyo, Japan',
    price: '$17,821',
    rating: 4.5,
    image: require('../assets/house6.png'),
    type: 'Villa',
  },
  {
    id: 4,
    name: 'Grand Living',
    location: 'Tokyo, Japan',
    price: '$21,469',
    rating: 4.8,
    image: require('../assets/house7.png'),
    type: 'House',
  },
  {
    id: 5,
    name: 'Skyline Loft',
    location: 'Tokyo, Japan',
    price: '$8,950',
    rating: 4.6,
    image: require('../assets/house8.png'),
    type: 'Apartment',
  },
  {
    id: 6,
    name: 'Garden Cottage',
    location: 'Tokyo, Japan',
    price: '$14,200',
    rating: 4.7,
    image: require('../assets/house9.png'),
    type: 'House',
  },
  {
    id: 7,
    name: 'Luxury Resort',
    location: 'Tokyo, Japan',
    price: '$32,500',
    rating: 4.9,
    image: require('../assets/house1.png'),
    type: 'Other',
  },
  {
    id: 8,
    name: 'Mountain Villa',
    location: 'Tokyo, Japan',
    price: '$19,800',
    rating: 4.4,
    image: require('../assets/house2.png'),
    type: 'Villa',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'House', 'Villa', 'Apartments', 'Other'];

  // Filter properties based on selected filter
  const filteredProperties = selectedFilter === 'All'
    ? recommendedProperties
    : recommendedProperties.filter(property => property.type === selectedFilter);

        const FeaturedPropertyCard = ({ property }: { property: any }) => (
    <TouchableOpacity
      className="mr-4 rounded-2xl overflow-hidden bg-white"
      style={{ width: width * 0.6, height: 320 }}
      onPress={() => router.push(`/property/${property.id}`)}
    >
      <View className="relative flex-1">
        <Image source={property.image} className="w-full h-48" resizeMode="cover" />

        {/* Rating Badge */}
        <View className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 flex-row items-center">
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text className="text-black-1 text-xs font-semibold ml-1" style={{ fontFamily: 'System', fontWeight: '600' }}>
            {property.rating}
          </Text>
        </View>

        {/* Heart Icon */}
        <TouchableOpacity className="absolute top-3 left-3 w-8 h-8 bg-white bg-opacity-90 rounded-full justify-center items-center">
          <Ionicons name="heart-outline" size={16} color="#6B7280" />
        </TouchableOpacity>

        {/* Property Info - Below Image */}
        <View className="p-4 flex-1">
          <Text className="text-black-1 text-base font-bold mb-1" style={{ fontFamily: 'System', fontWeight: '700' }}>
            {property.name}
          </Text>
          <Text className="text-black-2 text-sm mb-2" style={{ fontFamily: 'System', fontWeight: '400' }}>
            {property.location}
          </Text>
          <Text className="text-primary-1 text-lg font-bold" style={{ fontFamily: 'System', fontWeight: '700' }}>
            {property.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

    const RecommendationCard = ({ property }: { property: any }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100"
      style={{ width: (width - 50) / 2 - 8 }}
      onPress={() => router.push(`/property/${property.id}`)}
    >
      <View className="relative">
        <Image source={property.image} className="w-full h-32 rounded-t-2xl" resizeMode="cover" />

        {/* Rating Badge */}
        <View className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 flex-row items-center">
          <Ionicons name="star" size={10} color="#FFD700" />
          <Text className="text-black-1 text-xs font-semibold ml-1" style={{ fontFamily: 'System', fontWeight: '600' }}>
            {property.rating}
          </Text>
        </View>
      </View>

      <View className="p-3">
        <Text className="text-black-1 text-sm font-bold mb-1" style={{ fontFamily: 'System', fontWeight: '700' }}>
          {property.name}
        </Text>
        <Text className="text-black-2 text-xs mb-2" style={{ fontFamily: 'System', fontWeight: '400' }}>
          {property.location}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-primary-1 text-sm font-bold" style={{ fontFamily: 'System', fontWeight: '700' }}>
            {property.price}
          </Text>
          <TouchableOpacity className="w-6 h-6 justify-center items-center">
            <Ionicons name="heart-outline" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Status Bar */}
      <View className="h-11 bg-white" />

      {/* Header */}
      <View className="bg-white px-5 pt-4 pb-6">
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-primary-1 rounded-full justify-center items-center mr-3">
              <Text className="text-white text-lg font-bold" style={{ fontFamily: 'System', fontWeight: '700' }}>
                AS
              </Text>
            </View>
            <View>
              <Text className="text-black-2 text-sm" style={{ fontFamily: 'System', fontWeight: '400' }}>
                Good Morning
              </Text>
              <Text className="text-black-1 text-lg font-bold" style={{ fontFamily: 'System', fontWeight: '700' }}>
                Abdulsalam Sa'ad (Munaray)
              </Text>
            </View>
          </View>
          <TouchableOpacity className="relative">
            <Ionicons name="notifications-outline" size={24} color="#374151" />
            <View className="absolute -top-1 -right-1 w-3 h-3 bg-primary-1 rounded-full" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-3 text-black-1"
            placeholder="Search something"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ fontFamily: 'System', fontWeight: '400' }}
          />
          <TouchableOpacity onPress={() => router.push('/explore')} className="mr-2">
            <Ionicons name="options-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Featured Section */}
        <View className="px-5 pt-6 pb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black-1 text-xl font-bold" style={{ fontFamily: 'System', fontWeight: '700' }}>
              Featured
            </Text>
            <TouchableOpacity onPress={() => router.push('/explore')}>
              <Text className="text-primary-1 font-semibold" style={{ fontFamily: 'System', fontWeight: '600' }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredProperties.map((property) => (
              <FeaturedPropertyCard key={property.id} property={property} />
            ))}
          </ScrollView>
        </View>

        {/* Our Recommendation Section */}
        <View className="px-5 pb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black-1 text-xl font-bold" style={{ fontFamily: 'System', fontWeight: '700' }}>
              Our Recommendation
            </Text>
            <TouchableOpacity onPress={() => router.push('/explore')}>
              <Text className="text-primary-1 font-semibold" style={{ fontFamily: 'System', fontWeight: '600' }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <View className="flex-row gap-4">
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full ${
                    selectedFilter === filter
                      ? 'bg-primary-1'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      selectedFilter === filter
                        ? 'text-white'
                        : 'text-black-2'
                    }`}
                    style={{ fontFamily: 'System', fontWeight: '500' }}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Property Grid */}
          <View className="flex-row flex-wrap justify-between">
            {filteredProperties.map((property) => (
              <RecommendationCard key={property.id} property={property} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Navigator */}
      <BottomTabNavigator />
    </View>
  );
}