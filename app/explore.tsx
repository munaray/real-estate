import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Dimensions, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

// Mock data for explore properties based on Figma designs
const exploreProperties = [
  {
    id: 1,
    name: 'Lucky Lake Apartments',
    location: 'Beijing, China',
    price: '$1,234',
    rating: 4.8,
    image: require('../assets/property-list-1.png'),
    type: 'Apartment',
  },
  {
    id: 2,
    name: 'Home Away From Home',
    location: 'Beijing, China',
    price: '$1,234',
    rating: 4.8,
    image: require('../assets/property-list-2.png'),
    type: 'House',
  },
  {
    id: 3,
    name: 'Tranquil Tavern Apartments',
    location: 'Beijing, China',
    price: '$1,234',
    rating: 4.8,
    image: require('../assets/property-list-3.png'),
    type: 'Apartment',
  },
  {
    id: 4,
    name: 'Tropicana Del Norte De Forte',
    location: 'Beijing, China',
    price: '$1,234',
    rating: 4.8,
    image: require('../assets/property-list-4.png'),
    type: 'Villa',
  },
  {
    id: 5,
    name: 'La Grand Maison',
    location: 'Tokyo, Japan',
    price: '$12,219',
    rating: 4.8,
    image: require('../assets/property-grid-1.png'),
    type: 'Apartment',
  },
  {
    id: 6,
    name: 'La Grand Maison',
    location: 'Tokyo, Japan',
    price: '$1,424',
    rating: 4.8,
    image: require('../assets/property-grid-2.png'),
    type: 'House',
  },
  {
    id: 7,
    name: 'La Grand Maison',
    location: 'Tokyo, Japan',
    price: '$17,821',
    rating: 4.8,
    image: require('../assets/property-grid-3.png'),
    type: 'Villa',
  },
  {
    id: 8,
    name: 'La Grand Maison',
    location: 'Tokyo, Japan',
    price: '$21,469',
    rating: 4.8,
    image: require('../assets/property-grid-4.png'),
    type: 'Apartment',
  },
];

const filters = ['All', 'House', 'Villa', 'Apartments', 'Other'];

const PropertyCard = ({ property, viewMode }: { property: any; viewMode: 'grid' | 'list' }) => {
  const router = useRouter();

  if (viewMode === 'list') {
    return (
      <TouchableOpacity
        className="bg-white rounded-3xl overflow-hidden mb-4 shadow-sm flex-row"
        style={{ width: '100%', height: 128 }}
        onPress={() => router.push(`/property/${property.id}`)}
      >
        <View className="relative w-32 h-full">
          <Image
            source={property.image}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Rating Badge */}
          <View className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 flex-row items-center">
            <Ionicons name="star" size={8} color="#FFD700" />
            <Text className="text-black-1 text-xs font-semibold ml-1" style={{ fontFamily: 'System', fontWeight: '600' }}>
              {property.rating}
            </Text>
          </View>
        </View>

        <View className="flex-1 p-3 justify-between">
          <View>
            <Text className="text-black-1 text-lg font-bold mb-2" style={{ fontFamily: 'System', fontWeight: '600' }}>
              {property.name}
            </Text>
            <Text className="text-black-2 text-sm" style={{ fontFamily: 'System', fontWeight: '400' }}>
              {property.location}
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-primary-1 text-lg font-bold" style={{ fontFamily: 'System', fontWeight: '600' }}>
              {property.price}
            </Text>
            <TouchableOpacity className="w-6 h-6 justify-center items-center">
              <Ionicons name="heart-outline" size={20} color="#8C8E98" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Grid view
  return (
    <TouchableOpacity
      className="bg-white rounded-2xl overflow-hidden mb-4 shadow-sm"
      style={{ width: (width - 48) / 2 }}
      onPress={() => router.push(`/property/${property.id}`)}
    >
      <View className="relative">
        <Image
          source={property.image}
          className="w-full h-40"
          resizeMode="cover"
        />

        {/* Rating Badge */}
        <View className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 flex-row items-center">
          <Ionicons name="star" size={10} color="#FFD700" />
          <Text className="text-black-1 text-xs font-semibold ml-1" style={{ fontFamily: 'System', fontWeight: '600' }}>
            {property.rating}
          </Text>
        </View>
      </View>

      <View className="p-3">
        <Text className="text-black-1 text-base font-bold mb-1" style={{ fontFamily: 'System', fontWeight: '600' }}>
          {property.name}
        </Text>
        <Text className="text-black-2 text-xs mb-2" style={{ fontFamily: 'System', fontWeight: '400' }}>
          {property.location}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-primary-1 text-base font-bold" style={{ fontFamily: 'System', fontWeight: '600' }}>
            {property.price}
          </Text>
          <TouchableOpacity className="w-6 h-6 justify-center items-center">
            <Ionicons name="heart-outline" size={18} color="#8C8E98" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // Filter modal state
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  // Filter values state
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 350]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>(['Apartments', 'Townhomes', 'Homes', 'Condos', 'Duplexes', 'Studios']);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Apartments', 'Townhomes']);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [buildingSize, setBuildingSize] = useState<[number, number]>([1370, 2720]);

  const filteredProperties = exploreProperties.filter(property => {
    const matchesFilter = selectedFilter === 'All' || property.type === selectedFilter;
    const matchesSearch = searchQuery === '' ||
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Helper for property type pill toggle
  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Reset filter values
  const resetFilters = () => {
    setPriceRange([100, 350]);
    setSelectedTypes(['Apartments', 'Townhomes']);
    setBedrooms(2);
    setBathrooms(1);
    setBuildingSize([1370, 2720]);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View className="flex-1 bg-black bg-opacity-30 justify-end">
          <View className="bg-white rounded-t-3xl p-6 pb-8" style={{ minHeight: '80%' }}>
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="arrow-back" size={24} color="#191D31" />
              </TouchableOpacity>
              <Text className="text-lg font-bold">Filter</Text>
              <TouchableOpacity onPress={resetFilters}>
                <Text className="text-blue-500 font-semibold">Reset</Text>
              </TouchableOpacity>
            </View>
            {/* Price Range */}
            <Text className="text-base font-semibold mb-2">Price Range</Text>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs text-blue-700 font-bold">${priceRange[0]}</Text>
              <Text className="text-xs text-blue-700 font-bold">${priceRange[1]}</Text>
            </View>
            <View className="mb-6">
              <Slider
                style={{ width: '100%' }}
                minimumValue={50}
                maximumValue={400}
                step={1}
                value={priceRange[0]}
                onValueChange={val => setPriceRange([val, priceRange[1]])}
                minimumTrackTintColor="#2563eb"
                maximumTrackTintColor="#e5e7eb"
                thumbTintColor="#2563eb"
              />
              <Slider
                style={{ width: '100%' }}
                minimumValue={50}
                maximumValue={400}
                step={1}
                value={priceRange[1]}
                onValueChange={val => setPriceRange([priceRange[0], val])}
                minimumTrackTintColor="#2563eb"
                maximumTrackTintColor="#e5e7eb"
                thumbTintColor="#2563eb"
              />
            </View>
            {/* Property Type */}
            <Text className="text-base font-semibold mb-2">Property Type</Text>
            <View className="flex-row flex-wrap mb-6">
              {propertyTypes.map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => toggleType(type)}
                  className={`px-4 py-2 rounded-full mr-2 mb-2 ${selectedTypes.includes(type) ? 'bg-blue-600' : 'bg-gray-100'}`}
                >
                  <Text className={selectedTypes.includes(type) ? 'text-white font-semibold' : 'text-gray-700 font-semibold'}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Home Details */}
            <Text className="text-base font-semibold mb-2">Home Details</Text>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-sm font-medium">Bedrooms</Text>
              <View className="flex-row items-center">
                <TouchableOpacity onPress={() => setBedrooms(Math.max(0, bedrooms - 1))} className="w-8 h-8 rounded-full bg-gray-200 justify-center items-center mr-2">
                  <Text className="text-lg font-bold">-</Text>
                </TouchableOpacity>
                <Text className="text-base font-semibold mx-2">{bedrooms}</Text>
                <TouchableOpacity onPress={() => setBedrooms(bedrooms + 1)} className="w-8 h-8 rounded-full bg-blue-600 justify-center items-center ml-2">
                  <Text className="text-lg font-bold text-white">+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-sm font-medium">Bathrooms</Text>
              <View className="flex-row items-center">
                <TouchableOpacity onPress={() => setBathrooms(Math.max(0, bathrooms - 1))} className="w-8 h-8 rounded-full bg-gray-200 justify-center items-center mr-2">
                  <Text className="text-lg font-bold">-</Text>
                </TouchableOpacity>
                <Text className="text-base font-semibold mx-2">{bathrooms}</Text>
                <TouchableOpacity onPress={() => setBathrooms(bathrooms + 1)} className="w-8 h-8 rounded-full bg-blue-600 justify-center items-center ml-2">
                  <Text className="text-lg font-bold text-white">+</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Building Size */}
            <Text className="text-base font-semibold mb-2">Building Size</Text>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xs text-blue-700 font-bold">{buildingSize[0]}</Text>
              <Text className="text-xs text-blue-700 font-bold">{buildingSize[1]}</Text>
            </View>
            <View className="mb-8">
              <Slider
                style={{ width: '100%' }}
                minimumValue={1000}
                maximumValue={3000}
                step={10}
                value={buildingSize[0]}
                onValueChange={val => setBuildingSize([val, buildingSize[1]])}
                minimumTrackTintColor="#2563eb"
                maximumTrackTintColor="#e5e7eb"
                thumbTintColor="#2563eb"
              />
              <Slider
                style={{ width: '100%' }}
                minimumValue={1000}
                maximumValue={3000}
                step={10}
                value={buildingSize[1]}
                onValueChange={val => setBuildingSize([buildingSize[0], val])}
                minimumTrackTintColor="#2563eb"
                maximumTrackTintColor="#e5e7eb"
                thumbTintColor="#2563eb"
              />
            </View>
            {/* Set Filter Button */}
            <TouchableOpacity
              className="bg-blue-600 rounded-full py-4 mt-2"
              onPress={() => setFilterModalVisible(false)}
            >
              <Text className="text-white text-center text-base font-bold">Set Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Status Bar */}
      <View className="h-11 bg-white" />
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 bg-blue-50 rounded-full justify-center items-center"
        >
          <Ionicons name="arrow-back" size={22} color="#191D31" />
        </TouchableOpacity>
        <Text className="text-black-1 text-base font-medium" style={{ fontFamily: 'System', fontWeight: '500' }}>
          Search for Your Ideal Home
        </Text>
        <TouchableOpacity
          onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="w-11 h-11 bg-white rounded-full justify-center items-center relative"
        >
          <Ionicons
            name={viewMode === 'grid' ? 'list-outline' : 'grid-outline'}
            size={22}
            color="#191D31"
          />
          <View className="absolute top-3 right-3 w-2 h-2 bg-primary-1 rounded-full" />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 mb-4 border border-blue-100">
          <Ionicons name="search" size={20} color="#8C8E98" />
          <TextInput
            className="flex-1 ml-3 text-black-1"
            placeholder="Search something"
            placeholderTextColor="#8C8E98"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ fontFamily: 'System', fontWeight: '400', fontSize: 14 }}
          />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <Ionicons name="options-outline" size={20} color="#8C8E98" />
          </TouchableOpacity>
        </View>
        {/* Filter Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              className={`px-5 py-2 rounded-full mr-3 ${
                selectedFilter === filter
                  ? 'bg-primary-1'
                  : 'bg-blue-50 border border-blue-100'
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedFilter === filter
                    ? 'text-white'
                    : 'text-black-1'
                }`}
                style={{ fontFamily: 'System', fontWeight: selectedFilter === filter ? '600' : '400' }}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

                {/* Results Count */}
        <Text className="text-black-1 text-base font-bold mb-4" style={{ fontFamily: 'System', fontWeight: '700' }}>
          Found {filteredProperties.length} {selectedFilter === 'All' ? 'Properties' : selectedFilter + 's'}
        </Text>

        {/* Property Grid/List */}
        <View className={`${viewMode === 'grid' ? 'flex-row flex-wrap justify-between' : ''} pb-6`}>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} viewMode={viewMode} />
          ))}
        </View>
      </ScrollView>


    </View>
  );
}