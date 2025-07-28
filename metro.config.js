const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add support for expo-router
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Ensure proper resolution for expo-router
config.resolver.alias = {
  ...config.resolver.alias,
  'expo-router': require.resolve('expo-router'),
};

module.exports = withNativeWind(config, { input: './global.css' });
