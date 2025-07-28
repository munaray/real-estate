import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, FlatList, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Mock data for property details
const propertyData = {
  id: 1,
  name: 'Modernica Apartment',
  type: 'APARTMENT',
  price: '$17,821',
  rating: 4.8,
  reviews: 1275,
  beds: 8,
  baths: 3,
  sqft: '2000 sqft',
  description: 'Sleek, modern 2-bedroom apartment with open living space, high-end finishes, and city views. Minutes from downtown, dining, and transit.',
  address: 'Grand City St. 100, New York, United States',
  agent: {
    name: 'Natasya Wilodra',
    role: 'Owner',
    avatar: require('../../assets/agent-avatar.png'),
  },
  facilities: [
    { name: 'Car Parking', icon: 'car' },
    { name: 'Swimming Pool', icon: 'water' },
    { name: 'Gym & Fitness', icon: 'fitness' },
    { name: 'Restaurant', icon: 'restaurant' },
    { name: 'Wi-Fi & Network', icon: 'wifi' },
    { name: 'Pet Center', icon: 'paw' },
    { name: 'Sport Center', icon: 'football' },
    { name: 'Laundry', icon: 'shirt' },
  ],
  gallery: [
    require('../../assets/gallery-1.png'),
    require('../../assets/gallery-2.png'),
    require('../../assets/gallery-3.png'),
  ],
  reviewList: [
    {
      id: 1,
      user: 'Charolette Hanlin',
      avatar: require('../../assets/reviewer-avatar.png'),
      comment: 'The apartment is very clean and modern. I really like the interior design. Looks like I\'ll feel at home 😍',
      likes: 938,
      timeAgo: '6 days ago',
    },
  ],
};

export default function PropertyDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleContactAgent = () => {
    // Handle contact agent
    console.log('Contact agent');
  };

  const handleBooking = () => {
    // Handle booking
    console.log('Booking now');
  };

  const FacilityIcon = ({ name, icon }: { name: string; icon: string }) => (
    <View className="items-center w-1/4 mb-4">
      <View className="w-12 h-12 bg-blue-50 rounded-full justify-center items-center mb-2">
        <Ionicons name={icon as any} size={20} color="#0061FF" />
      </View>
      <Text className="text-black-1 text-xs text-center" style={{ fontFamily: 'System', fontWeight: '400' }}>
        {name}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Status Bar */}
      <View className="h-11 bg-white" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Main Property Image */}
        <View className="relative">
          <Image
            source={require('../../assets/property-main.png')}
            className="w-full h-96"
            resizeMode="cover"
          />

          {/* Image Indicators */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
            {[1, 2, 3, 4].map((_, index) => (
              <View
                key={index}
                className={`mx-1 ${
                  index === currentImageIndex
                    ? 'w-8 h-2 bg-primary-1 rounded-full'
                    : 'w-2 h-2 bg-white bg-opacity-50 rounded-full'
                }`}
              />
            ))}
          </View>

                    {/* Header with Back Button */}
          <View className="absolute top-4 left-4 right-4 flex-row justify-between items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-12 h-12 bg-black bg-opacity-30 rounded-full justify-center items-center"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => setIsFavorite(!isFavorite)}
                className="w-12 h-12 bg-black bg-opacity-30 rounded-full justify-center items-center"
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? "#EF4444" : "white"}
                />
              </TouchableOpacity>
              <TouchableOpacity className="w-12 h-12 bg-black bg-opacity-30 rounded-full justify-center items-center">
                <Ionicons name="paper-plane-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Property Information */}
        <View className="px-5 py-6">
          {/* Title and Type */}
          <View className="mb-4">
            <Text className="text-black-1 text-2xl font-bold mb-2" style={{ fontFamily: 'System', fontWeight: '700' }}>
              {propertyData.name}
            </Text>
            <View className="flex-row items-center justify-between mb-4">
              <View className="bg-primary-1 px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-semibold uppercase" style={{ fontFamily: 'System', fontWeight: '600' }}>
                  {propertyData.type}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text className="text-black-1 text-sm font-medium ml-1" style={{ fontFamily: 'System', fontWeight: '500' }}>
                  {propertyData.rating} ({propertyData.reviews.toLocaleString()} reviews)
                </Text>
              </View>
            </View>
          </View>

          {/* Property Stats */}
          <View className="flex-row justify-between mb-6">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-blue-50 rounded-full justify-center items-center mr-3">
                <Ionicons name="bed-outline" size={20} color="#0061FF" />
              </View>
              <Text className="text-black-1 text-sm font-medium" style={{ fontFamily: 'System', fontWeight: '500' }}>
                {propertyData.beds} Beds
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-blue-50 rounded-full justify-center items-center mr-3">
                <Ionicons name="water-outline" size={20} color="#0061FF" />
              </View>
              <Text className="text-black-1 text-sm font-medium" style={{ fontFamily: 'System', fontWeight: '500' }}>
                {propertyData.baths} bath
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-blue-50 rounded-full justify-center items-center mr-3">
                <Ionicons name="resize-outline" size={20} color="#0061FF" />
              </View>
              <Text className="text-black-1 text-sm font-medium" style={{ fontFamily: 'System', fontWeight: '500' }}>
                {propertyData.sqft}
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View className="h-px bg-gray-200 mb-6" />

          {/* Agent Section */}
          <View className="mb-6">
            <Text className="text-black-1 text-xl font-bold mb-4" style={{ fontFamily: 'System', fontWeight: '700' }}>
              Agent
            </Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-5">
                <Image source={propertyData.agent.avatar} className="w-16 h-16 rounded-full" />
                <View>
                  <Text className="text-black-1 text-lg font-bold" style={{ fontFamily: 'System', fontWeight: '700' }}>
                    {propertyData.agent.name}
                  </Text>
                  <Text className="text-black-2 text-sm" style={{ fontFamily: 'System', fontWeight: '400' }}>
                    {propertyData.agent.role}
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-3">
                <TouchableOpacity className="w-10 h-10 bg-blue-50 rounded-full justify-center items-center">
                  <Ionicons name="chatbubble-outline" size={20} color="#0061FF" />
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 bg-blue-50 rounded-full justify-center items-center">
                  <Ionicons name="call-outline" size={20} color="#0061FF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Overview Section */}
          <View className="mb-6">
            <Text className="text-black-1 text-xl font-bold mb-3" style={{ fontFamily: 'System', fontWeight: '600' }}>
              Overview
            </Text>
            <Text className="text-black-2 text-base leading-6" style={{ fontFamily: 'System', fontWeight: '400' }}>
              {propertyData.description}
            </Text>
          </View>

          {/* Facilities Section */}
          <View className="mb-6">
            <Text className="text-black-1 text-xl font-bold mb-4" style={{ fontFamily: 'System', fontWeight: '700' }}>
              Facilities
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {propertyData.facilities.map((facility, index) => (
                <FacilityIcon key={index} name={facility.name} icon={facility.icon} />
              ))}
            </View>
          </View>

          {/* Gallery Section */}
          <View className="mb-6">
            <Text className="text-black-1 text-xl font-bold mb-4" style={{ fontFamily: 'System', fontWeight: '700' }}>
              Gallery
            </Text>
            <View className="flex-row gap-3">
              {propertyData.gallery.map((image, index) => (
                <View key={index} className="relative flex-1">
                  <Image source={image} className="w-full h-36 rounded-xl" resizeMode="cover" />
                  {index === 2 && (
                    <View className="absolute inset-0 bg-black bg-opacity-50 rounded-xl justify-center items-center">
                      <Text className="text-white text-lg font-bold" style={{ fontFamily: 'System', fontWeight: '700' }}>
                        20+
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Location Section */}
<View className="mb-6">
  <Text className="text-black-1 text-xl font-bold mb-4" style={{ fontFamily: 'System', fontWeight: '700' }}>
    Location
  </Text>
  <View className="flex-row items-center mb-4">
    <Ionicons name="location" size={16} color="#0061FF" />
    <Text className="text-black-2 text-sm ml-2" style={{ fontFamily: 'System', fontWeight: '500' }}>
      {propertyData.address}
    </Text>
  </View>
  <View className="w-full h-48 rounded-3xl overflow-hidden relative">
    <Image
      source={require('../../assets/map-background.png')}
      className="w-full h-full"
      resizeMode="cover"
    />
    {/* Street names overlay */}
    <View className="absolute inset-0 p-4">
      <Text className="text-black-2 text-xs absolute top-4 left-4" style={{ fontFamily: 'System', fontWeight: '400' }}>
        488 Farwell Road
      </Text>
      <Text className="text-black-2 text-xs absolute top-8 right-4" style={{ fontFamily: 'System', fontWeight: '400' }}>
        657 Lukken Court
      </Text>
      <Text className="text-black-2 text-xs absolute bottom-8 left-4" style={{ fontFamily: 'System', fontWeight: '400' }}>
        9 Evergreen Center
      </Text>
      <Text className="text-black-2 text-xs absolute bottom-4 right-4" style={{ fontFamily: 'System', fontWeight: '400' }}>
        59797 Elka Trail
      </Text>
    </View>
    {/* Map pin with building icon */}
    <View className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <View className="w-14 h-14 bg-primary-1 rounded-full justify-center items-center shadow-lg">
        <Ionicons name="business" size={28} color="white" />
      </View>
    </View>
  </View>
</View>

          {/* Reviews Section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text className="text-black-1 text-lg font-bold ml-2" style={{ fontFamily: 'System', fontWeight: '700' }}>
                  {propertyData.rating} ({propertyData.reviews.toLocaleString()} reviews)
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-primary-1 font-semibold" style={{ fontFamily: 'System', fontWeight: '600' }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {propertyData.reviewList.map((review) => (
              <View key={review.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <View className="flex-row items-start mb-3">
                  <Image source={review.avatar} className="w-12 h-12 rounded-full mr-3" />
                  <View className="flex-1">
                    <Text className="text-black-1 text-base font-bold mb-1" style={{ fontFamily: 'System', fontWeight: '700' }}>
                      {review.user}
                    </Text>
                    <Text className="text-black-2 text-sm leading-5" style={{ fontFamily: 'System', fontWeight: '400' }}>
                      {review.comment}
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <Ionicons name="heart-outline" size={16} color="#666876" />
                    <Text className="text-black-1 text-sm ml-1" style={{ fontFamily: 'System', fontWeight: '500' }}>
                      {review.likes}
                    </Text>
                  </View>
                  <Text className="text-black-2 text-sm" style={{ fontFamily: 'System', fontWeight: '400' }}>
                    {review.timeAgo}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Booking Bar */}
      <View className="bg-white border-t border-gray-100 px-6 py-4 shadow-lg">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-black-2 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: 'System', fontWeight: '500' }}>
              PRICE
            </Text>
            <Text className="text-primary-1 text-2xl font-bold" style={{ fontFamily: 'System', fontWeight: '700' }}>
              {propertyData.price}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleBooking}
            className="bg-primary-1 px-8 py-4 rounded-full shadow-md"
          >
            <Text className="text-white text-base font-bold" style={{ fontFamily: 'System', fontWeight: '700' }}>
              Booking Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}