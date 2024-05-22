import { useEffect, useRef, useState } from 'react';
import './animations.css';
import FloatingPlusOne from '../FloatingPlusOne';
import RangeInput from '../RangeInput/RangeInput';
import GoldCoinIcon from '../GoldCoinIcon';
import GoldPlayIcon from '../GoldPlayIcon';
import GoldBarChartIcon from '../GoldBarChartIcon';
import GoldTrophyIcon from '../GoldTrophyIcon';

const brightColors = [
  { name: "Electric Lime", code: "#CCFF00" },
  { name: "Laser Lemon", code: "#FFFF66" },
  { name: "Shocking Pink", code: "#FC0FC0" },
  { name: "Outrageous Orange", code: "#FF6E4A" },
  { name: "Neon Carrot", code: "#FFA343" },
  { name: "Razzle Dazzle Rose", code: "#FF33CC" },
  { name: "Electric Blue", code: "#7DF9FF" },
  { name: "Blazing Yellow", code: "#FFD700" },
  { name: "Radical Red", code: "#FF355E" },
  { name: "Cyber Grape", code: "#58427C" },
  { name: "Sizzling Sunrise", code: "#FFDB00" },
  { name: "Screamin' Green", code: "#76FF7A" },
  { name: "Illuminating Emerald", code: "#319177" },
  { name: "Fluorescent Orange", code: "#FFBF00" },
  { name: "Gargoyle Gas", code: "#FFFF66" },
  { name: "Luminous Lemon", code: "#FDFF00" },
  { name: "Infra Red", code: "#FF496C" },
  { name: "Ultra Violet", code: "#5F00BA" },
  { name: "Jasmine", code: "#F8DE7E" },
  { name: "Bright Magenta", code: "#FF007F" },
  { name: "Purple Pizzazz", code: "#FE4EDA" },
  { name: "Vivid Sky Blue", code: "#00CCFF" },
  { name: "Electric Violet", code: "#8F00FF" },
  { name: "Vivid Tangerine", code: "#FFA089" },
  { name: "Neon Green", code: "#39FF14" }
];

const gradients = [
  'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
  'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600',
  'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500',
  'bg-gradient-to-r from-blue-500 via-teal-400 to-green-500',
  'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
  'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500',
  'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
  'bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500',
  'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500',
  'bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500',
  'bg-gradient-to-r from-green-500 via-yellow-500 to-red-500',
  'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500',
  'bg-gradient-to-r from-blue-500 via-green-400 to-yellow-500',
  'bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500',
  'bg-gradient-to-r from-orange-500 via-pink-500 to-red-500'
];



const AnimatedBackground = () => {
  const [helixColor, setHelixColor] = useState('white');
  const [pointsNo, setPointsNo] = useState(1);
  const [rangeValue, setRangeValue] = useState(1);
  const [bgGradient, setBgGradient] = useState('bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500')

  
  const prevRangeValueRef = useRef(rangeValue);

  useEffect(() => {
    const interval = setInterval(() => {
      const prevRangeValue = prevRangeValueRef.current;
      const hasIncreased = rangeValue > prevRangeValue;
      console.log(hasIncreased ? 'Value has increased' : 'Value has not increased');
      if (!hasIncreased && rangeValue !== 0) {
        setRangeValue(rangeValue - 1)
        if (pointsNo !== 1 && rangeValue === 1) setPointsNo (pointsNo - 1)
      }

      // Update the previous value to the current value for the next comparison
      prevRangeValueRef.current = rangeValue;
    }, 1000); // Check every 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [rangeValue]);

  const changeColor = () => {
    const randomColor = brightColors[Math.floor(Math.random() * brightColors.length)].code;
    setHelixColor(randomColor);
  };

  const changeBgGradient = () => {
    const randomColor = gradients[Math.floor(Math.random() * gradients.length)];
    setBgGradient(randomColor);
  };

  return (
    <div className={`w-full h-screen ${bgGradient} animate-moveBackground bg-[length:200%_200%] bg-cover bg-center`}>
      <div className="flex gap-4 items-center justify-center w-full h-[20vh] px-4 py-6">
        <GoldCoinIcon />
        <h1 className="text-white text-2xl font-bold">245678</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-[50vh] gap-5">
        <h1 className="text-white text-xs font-bold p-2 border border-[#FFF] rounded-full">TAP BELOW TO PLAY</h1>
        <div className="flex items-center justify-center w-auto" onClick={() => {
          changeColor()
          changeBgGradient()
          if (rangeValue === 100) {
            setRangeValue(0)
            setPointsNo(pointsNo + 1)
          } else {
            setRangeValue(rangeValue + 1)
          }
          
        }}>
          <FloatingPlusOne helixColor={helixColor} pointsNo={pointsNo} />
        </div>
        <div className="flex items-center justify-center w-full">
          <RangeInput rangeValue={rangeValue} />
        </div>
      </div>
      <div className="w-[90%] mx-auto h-[12vh] border border-[#FFF] rounded-full">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col gap-1 items-center justify-center cursor-pointer text-xs border border-[#FFF] px-1 h-full text-[#FFF] w-1/3 rounded-l-full">
            <GoldPlayIcon />
            <span>PLAY</span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center cursor-pointer text-xs border border-[#FFF] px-1 h-full text-[#FFF] w-1/3">
            <GoldBarChartIcon />
            <span>REFERRALS</span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center cursor-pointer text-xs border border-[#FFF] px-1 h-full text-[#FFF] w-1/3 rounded-r-full">
            <GoldTrophyIcon />
            <span>LEADERBOARD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
