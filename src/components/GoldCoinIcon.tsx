import React from 'react';

const GoldCoinIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="30" fill="url(#goldGradient)" stroke="#FFD700" strokeWidth="4"/>
    <path
      d="M32 12C22.0589 12 14 20.0589 14 30C14 39.9411 22.0589 48 32 48C41.9411 48 50 39.9411 50 30C50 20.0589 41.9411 12 32 12ZM32 44C24.268 44 18 37.732 18 30C18 22.268 24.268 16 32 16C39.732 16 46 22.268 46 30C46 37.732 39.732 44 32 44Z"
      fill="#FFD700"
    />
    <path
      d="M29 22H35V26H31C29.8954 26 29 26.8954 29 28V30C29 31.1046 29.8954 32 31 32H33C35.2091 32 37 33.7909 37 36V38C37 40.2091 35.2091 42 33 42H27V38H31C32.1046 38 33 37.1046 33 36V34C33 32.8954 32.1046 32 31 32H29C26.7909 32 25 30.2091 25 28V26C25 23.7909 26.7909 22 29 22Z"
      fill="#FFD700"
    />
    <defs>
      <linearGradient id="goldGradient" x1="32" y1="2" x2="32" y2="62" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD700"/>
        <stop offset="1" stopColor="#FFAA00"/>
      </linearGradient>
    </defs>
  </svg>
);

export default GoldCoinIcon;
