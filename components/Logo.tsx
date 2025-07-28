import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ width = 134, height = 113 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 134 113" fill="none">
      <Path
        d="M74.4688 99.631L42.2788 99.402V0L74.4688 20.417V99.631Z"
        fill="url(#paint0_linear_85019_15482)"
      />
      <Path
        d="M89.4275 92.689L76.2295 97.098V37.894L89.4275 46.359V92.689Z"
        fill="url(#paint1_linear_85019_15482)"
      />
      <Path
        d="M27.3198 97.962L40.5178 99.255V37.894L27.3198 46.359V97.962Z"
        fill="url(#paint2_linear_85019_15482)"
      />
      <Path
        d="M92.7746 41.7319C103.962 47.6979 110.862 55.8369 110.862 64.8149C110.862 83.1099 82.2566 97.9409 46.9706 97.9409C34.0726 97.9409 22.0776 95.9529 12.0356 92.5449C23.6446 98.7359 39.8696 102.588 57.8396 102.588C93.1256 102.588 121.731 87.7569 121.731 69.4619C121.73 57.8549 110.206 47.6479 92.7746 41.7319Z"
        fill="url(#paint3_linear_85019_15482)"
      />
      <Path
        d="M102.445 43.8682C117.496 50.5922 126.966 60.3382 126.966 71.1862C126.966 91.4742 93.8576 107.92 53.0156 107.92C32.2466 107.92 13.4896 103.661 0.0576172 96.8132C13.4926 106.28 35.3246 112.445 59.9926 112.445C100.834 112.445 133.943 95.5622 133.943 74.7362C133.944 61.9682 121.487 50.6902 102.445 43.8682Z"
        fill="#414042"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_85019_15482"
          x1="58.8015"
          y1="10.6981"
          x2="57.8791"
          y2="95.0873"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.2185" stopColor="#006CBD" />
          <Stop offset="1" stopColor="#004F94" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_85019_15482"
          x1="82.7064"
          y1="42.6199"
          x2="82.9164"
          y2="92.5999"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.0673" stopColor="#006CBD" />
          <Stop offset="0.3253" stopColor="#0067B6" />
          <Stop offset="0.695" stopColor="#005AA3" />
          <Stop offset="0.9244" stopColor="#004F94" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_85019_15482"
          x1="33.919"
          y1="42.9657"
          x2="33.919"
          y2="95.9959"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.1128" stopColor="#006CBD" />
          <Stop offset="0.728" stopColor="#0059A2" />
          <Stop offset="1" stopColor="#004F94" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_85019_15482"
          x1="65.3249"
          y1="88.2325"
          x2="78.4495"
          y2="36.6092"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#006CBD" />
          <Stop offset="0.301" stopColor="#0067B6" />
          <Stop offset="0.7323" stopColor="#005AA3" />
          <Stop offset="1" stopColor="#004F94" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};