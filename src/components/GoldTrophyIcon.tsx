import React from 'react';

const GoldTrophyIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 6H52V20C52 29.9411 44.9411 37 35 37H29C19.0589 37 12 29.9411 12 20V6Z"
      fill="url(#trophyGradient)"
    />
    <path
      d="M42 6C42 12.6274 36.6274 18 30 18C23.3726 18 18 12.6274 18 6H42Z"
      fill="#FFD700"
    />
    <rect x="24" y="37" width="16" height="4" fill="#FFD700" />
    <rect x="28" y="41" width="8" height="4" fill="#FFD700" />
    <rect x="22" y="45" width="20" height="2" fill="#FFD700" />
    <rect x="20" y="47" width="24" height="4" fill="#FFD700" />
    <defs>
      <linearGradient id="trophyGradient" x1="12" y1="6" x2="52" y2="37" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD700" />
        <stop offset="1" stopColor="#FFAA00" />
      </linearGradient>
    </defs>
  </svg>
);

export default GoldTrophyIcon;
