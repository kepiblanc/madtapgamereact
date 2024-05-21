import { useState } from 'react';
import './animations.css';
import FloatingPlusOne from '../FloatingPlusOne';

const AnimatedBackground = () => {
  const [helixSize, setHelixSize] = useState(60);
  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-moveBackground bg-[length:200%_200%]">
      <div className="w-full h-[10vh] border border-b-[#FFF]">
        <div className="flex items-center justify-between h-full px-4">
          <h1 className="text-white text-4xl font-bold">MADTAP</h1>
          
          <h1 className="text-white text-md font-bold">245678 POINTS</h1>
        </div>
      </div>
      <div className="w-full h-[80vh] bg-cover bg-center">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-white text-xs font-bold">TAP TO PLAY</h1>
          <div className="flex items-center justify-center w-auto" onClick={() => {
            console.log(helixSize)
            if (helixSize === 100) {
              setHelixSize(60)
            } else {
              setHelixSize(helixSize + 2)
            }
          }}>
            <FloatingPlusOne helixSize={helixSize} />
          </div>
        </div>
      </div>
      <div className="w-full h-[10vh]">
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center justify-center cursor-pointer text-xs border border-[#FFF] px-1 h-full text-[#FFF] w-1/3">
            <span>PLAY</span>
          </div>
          <div className="flex items-center justify-center cursor-pointer text-xs border border-[#FFF] px-1 h-full text-[#FFF] w-1/3">
            <span>REFERRALS</span>
          </div>
          <div className="flex items-center justify-center cursor-pointer text-xs border border-[#FFF] px-1 h-full text-[#FFF] w-1/3">
            <span>LEADERBOARD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
