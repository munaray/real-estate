# Real Estate App

A React Native real estate application built with Expo, featuring Google Sign-In authentication and a modern UI.

## Features

- 🏠 Real estate image gallery
- 🔐 Google Sign-In authentication
- 📱 Responsive design with Tailwind CSS
- 🎨 Modern UI with smooth animations
- 🔄 Expo Router navigation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory with your Google Sign-In credentials:

```env
# Google Sign-In Configuration
GOOGLE_WEB_CLIENT_ID=your_google_web_client_id_here
GOOGLE_IOS_CLIENT_ID=your_google_ios_client_id_here
GOOGLE_ANDROID_CLIENT_ID=your_google_android_client_id_here

# API Configuration
API_BASE_URL=https://your-api-endpoint.com
API_KEY=your_api_key_here

# App Configuration
APP_NAME=Real Scout
APP_VERSION=1.0.0
```

### 3. Google Sign-In Setup

#### For Android:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sign-In API
4. Create OAuth 2.0 credentials
5. Add your Android package name and SHA-1 fingerprint
6. Copy the Client ID to `GOOGLE_ANDROID_CLIENT_ID`

#### For iOS:
1. In Google Cloud Console, create iOS OAuth 2.0 credentials
2. Add your iOS bundle identifier
3. Copy the Client ID to `GOOGLE_IOS_CLIENT_ID`

#### For Web:
1. In Google Cloud Console, create Web OAuth 2.0 credentials
2. Add your domain to authorized origins
3. Copy the Client ID to `GOOGLE_WEB_CLIENT_ID`

### 4. Update Configuration

Replace the placeholder values in `app/get-started.tsx`:

```typescript
GoogleSignin.configure({
  webClientId: 'your_actual_web_client_id',
  iosClientId: 'your_actual_ios_client_id',
  offlineAccess: true,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
});
```

### 5. Run the App

```bash
# Start the development server
npx expo start

# Run on Android
npx expo run:android

# Run on iOS
npx expo run:ios
```

## Project Structure

```
real-estate-app/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Entry point
│   ├── splash.tsx         # Splash screen
│   └── get-started.tsx    # Get started screen
├── components/            # Reusable components
│   ├── GoogleLogo.tsx     # Google logo SVG
│   ├── Logo.tsx           # App logo SVG
│   └── FontLoader.tsx     # Font loading component
├── services/              # Business logic
│   └── googleSignIn.ts    # Google Sign-In service
├── assets/                # Static assets
│   ├── fonts/             # Custom fonts
│   └── house*.png         # Real estate images
└── .env.local             # Environment variables (not committed)
```

## Security Notes

- ✅ `.env.local` is in `.gitignore` to prevent committing sensitive data
- ✅ Google Client IDs are stored in environment variables
- ✅ API keys are secured in environment variables
- ⚠️ Never commit actual client IDs or API keys to version control

## Troubleshooting

### Google Sign-In Issues:
1. Ensure Google Play Services is installed (Android)
2. Verify client IDs are correct
3. Check that OAuth consent screen is configured
4. Ensure package name/bundle ID matches Google Console

### Environment Variables:
1. Restart the development server after changing `.env.local`
2. Verify babel configuration includes `react-native-dotenv`
3. Check that environment variable names match in code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.