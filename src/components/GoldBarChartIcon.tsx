import React from 'react';

const GoldBarChartIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="10" y="35" width="10" height="20" fill="url(#barGradient)" />
    <rect x="27" y="20" width="10" height="35" fill="url(#barGradient)" />
    <rect x="44" y="10" width="10" height="45" fill="url(#barGradient)" />
    <defs>
      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD700" />
        <stop offset="1" stopColor="#FFAA00" />
      </linearGradient>
    </defs>
  </svg>
);

export default GoldBarChartIcon;
