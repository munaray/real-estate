import React from 'react';

interface FontLoaderProps {
  children: React.ReactNode;
}

export const FontLoader: React.FC<FontLoaderProps> = ({ children }) => {
  // Skip font loading for now and use system fonts
  return <>{children}</>;
};