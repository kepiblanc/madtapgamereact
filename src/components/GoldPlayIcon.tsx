import React from 'react';

const GoldPlayIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="30" fill="url(#playGradient)" stroke="#FFD700" strokeWidth="4"/>
    <path
      d="M26 22L46 32L26 42V22Z"
      fill="#FFD700"
    />
    <defs>
      <linearGradient id="playGradient" x1="32" y1="2" x2="32" y2="62" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD700"/>
        <stop offset="1" stopColor="#FFAA00"/>
      </linearGradient>
    </defs>
  </svg>
);

export default GoldPlayIcon;
