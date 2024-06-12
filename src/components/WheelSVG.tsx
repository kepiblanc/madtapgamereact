import React from 'react';

const WheelSVG = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    {/* Wheel Background */}
    <circle cx="100" cy="100" r="95" fill="#8B0000" stroke="#FFFFFF" stroke-width="10"/>
    
    {/* Wheel Sections */}
    <g>
      <path d="M100 100 L100 10 A90 90 0 0 1 190 100 Z" fill="#FFDDC1"/>
      <path d="M100 100 L190 100 A90 90 0 0 1 100 190 Z" fill="#FFABAB"/>
      <path d="M100 100 L100 190 A90 90 0 0 1 10 100 Z" fill="#FFC3A0"/>
      <path d="M100 100 L10 100 A90 90 0 0 1 100 10 Z" fill="#FF677D"/>
    </g>
    
    {/* Center Circle */}
    <circle cx="100" cy="100" r="20" fill="#000" />

    {/* Placeholder for Text or Images on the Wheel Sections */}
    <text x="140" y="50" fill="#000" font-size="12" font-family="Arial" text-anchor="middle">1000</text>
    <text x="140" y="140" fill="#000" font-size="12" font-family="Arial" text-anchor="middle">5000</text>
    <text x="60" y="140" fill="#000" font-size="12" font-family="Arial" text-anchor="middle">2000</text>
    <text x="60" y="50" fill="#000" font-size="12" font-family="Arial" text-anchor="middle">3000</text>

    {/* Coins (Simplified) */}
    <circle cx="60" cy="60" r="5" fill="#FFD700" />
    <circle cx="140" cy="60" r="5" fill="#FFD700" />
    <circle cx="100" cy="140" r="5" fill="#FFD700" />
  </svg>
);

export default WheelSVG;
