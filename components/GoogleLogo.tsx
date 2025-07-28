import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface GoogleLogoProps {
  width?: number;
  height?: number;
}

export const GoogleLogo: React.FC<GoogleLogoProps> = ({ width = 22, height = 22 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
      <Path
        d="M21.39 11.22c0-.73-.07-1.43-.2-2.12H11v4.02h5.84c-.23 1.12-.9 2.08-1.92 2.72v2.26h3.11c1.82-1.68 2.87-4.15 2.87-6.88z"
        fill="#4285F4"
      />
      <Path
        d="M11 21.5c2.61 0 4.79-.86 6.39-2.34l-3.11-2.26c-.86.58-1.96.92-3.28.92-2.52 0-4.66-1.7-5.42-3.98H2.5v2.34C4.13 18.92 7.39 21.5 11 21.5z"
        fill="#34A853"
      />
      <Path
        d="M5.58 13.84c-.2-.58-.31-1.2-.31-1.84s.11-1.26.31-1.84V7.82H2.5C1.83 9.24 1.5 10.87 1.5 12.5s.33 3.26.99 4.68l3.09-2.34z"
        fill="#FBBC04"
      />
      <Path
        d="M11 5.38c1.42 0 2.69.49 3.69 1.44l2.76-2.76C15.79 2.34 13.61 1.5 11 1.5 7.39 1.5 4.13 4.08 2.5 7.82l3.08 2.34c.76-2.28 2.9-3.98 5.42-3.98z"
        fill="#EA4335"
      />
    </Svg>
  );
};