import { useEffect, useRef, useState } from 'react';
import './animations.css';
import FloatingPlusOne from '../FloatingPlusOne';
import RangeInput from '../RangeInput/RangeInput';
import GoldCoinIcon from '../GoldCoinIcon';
import GoldPlayIcon from '../GoldPlayIcon';
import GoldBarChartIcon from '../GoldBarChartIcon';
import GoldTrophyIcon from '../GoldTrophyIcon';
import axios from 'axios';
import { API_URL } from '../../utils'
import Leaderboard from '../Leaderboard';
import Keypad from '../Keypad';

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
  const [currentView, setCurrentView] = useState('play')
  const [user, setUser] = useState<Telegram.InitDataUser | null>(null);
  const [gamePlayPoints, setGamePlayPoints] = useState(0)
  const [referralCode, setReferralCode] = useState('Not Available');
  const [referralPoints, setReferralPoints] = useState(0)
  const [leaderboardData, setLeaderboardData] = useState<any>([])

  const mockLeaderboardData = [
    { id: 1, name: 'John Doe', points: 28, referrals: 28, total: 22 },
    { id: 2, name: 'Jane Doe', points: 32, referrals: 32, total: 22 },
    { id: 3, name: 'Sam Smith', points: 24, referrals: 24, total: 22 },
    { id: 4, name: 'Sara Connor', points: 29, referrals: 29, total: 22 },
    { id: 5, name: 'Chris Evans', points: 35, referrals: 35, total: 22 },
    { id: 6, name: 'Mia Wong', points: 30, referrals: 30, total: 22 },
    // Add more data as needed
  ];

  useEffect(() => {
    // Ensure the Telegram Web Apps SDK is ready
    Telegram.WebApp.ready();

    // Access the user information
    const userInfo = Telegram.WebApp.initDataUnsafe.user;

    // Check if the user information is available
    if (userInfo) {
      console.log({userInfo, url: window.location.href});
      setUser(userInfo);
    } else {
      console.log('No user information available.');
    }
  }, []);

  
  const prevRangeValueRef = useRef(rangeValue);

  useEffect(() => {
    const interval = setInterval(() => {
      const prevRangeValue = prevRangeValueRef.current;
      const hasIncreased = rangeValue > prevRangeValue;
      if (!hasIncreased && rangeValue !== 0) {
        if (pointsNo === 1 && rangeValue === 1) {
          setHelixColor('white')
        }

        if (pointsNo !== 1 && rangeValue === 1) {
          setPointsNo (pointsNo - 1)
          setRangeValue(100)
          setHelixColor('white')
        } else {
          setRangeValue(rangeValue - 1)
        }
      }

      // Update the previous value to the current value for the next comparison
      prevRangeValueRef.current = rangeValue;
    }, 1000); // Check every 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [rangeValue]);

  useEffect (() => {
    const fetchUserData = async () => {
      const getUserData = await axios.post(`${API_URL}/get-user-data`, {user})
      //console.log({getUserData})
      setGamePlayPoints(getUserData?.data?.userData?.pointsNo)
      if (getUserData?.data?.userData?.referralCode) setReferralCode(getUserData?.data?.userData?.referralCode)
      if (getUserData?.data?.userData?.referralPoints) setReferralPoints(getUserData?.data?.userData?.referralPoints)
    }
    if (user) {
      fetchUserData();
    }
  }, [user])

  useEffect (() => {
    const fetchLeaderboardData = async () => {
      const getLeaderboardData = await axios.post(`${API_URL}/leaderboard-data`, {})

      const sortedData = getLeaderboardData.data.leaderboardData.map((board: any) => {
        return {
          id: board.user.id, 
          name: board.user.username ? board.user.username : board.user.first_name, 
          points: board.pointsNo, 
          referrals: board.referralPoints, 
          total: board.totalPoints
        }
      })

      setLeaderboardData(sortedData)
    }
    fetchLeaderboardData();
  }, [])

  const changeColor = () => {
    const randomColor = brightColors[Math.floor(Math.random() * brightColors.length)].code;
    setHelixColor(randomColor);
  };

  const changeBgGradient = () => {
    const randomColor = gradients[Math.floor(Math.random() * gradients.length)];
    setBgGradient(randomColor);
  };

  return (
    <div className={`w-full min-h-screen ${bgGradient} animate-moveBackground bg-[length:200%_200%] bg-cover bg-center`}>
      {
        currentView === 'play' &&
        <>
          <div className="flex gap-4 items-center justify-center w-full px-4 py-6">
            <GoldCoinIcon />
            <h1 className="text-white text-2xl font-bold">{gamePlayPoints}</h1>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-3 h-auto overflow-y-scroll">
            <h1 className="text-white text-xs font-bold p-2 border border-[#FFF] rounded-full">TAP THE RUNNER ICON BELOW TO PLAY</h1>
            <div className="flex items-center justify-center w-full sm:w-[60vw] md:w-[50vw] lg:w-[40vw]" onClick={async () => {
              changeColor()
              //changeBgGradient()
              if (rangeValue === 100) {
                setRangeValue(0)
                setPointsNo(pointsNo + 1)
              } else {
                setRangeValue(rangeValue + 1)
              }
              const updatePoints = await axios.post(`${API_URL}/update-tap-points`, {
                pointsNo,
                user
              })

              setGamePlayPoints(updatePoints?.data?.userData?.pointsNo)
            }}>
              <Keypad helixColor={helixColor} pointsNo={pointsNo} /> 
            </div>
            <div className="flex items-center justify-center w-full">
              <RangeInput rangeValue={rangeValue} />
            </div>
          </div>
        </>
      }

      {
        currentView === 'referrals' &&
        <div className="flex flex-col h-[70vh] justify-center items-center">
          <p className="flex items-center justify-center text-white">Referrals</p>
          <div className="flex flex-col w-[90%] sm:w-[70%] md:w-[50%] mx-auto border border-[#FFF] rounded-md text-[#FFF] gap-4">
            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-b-[#FFF] py-3">
              <p className="font-bold flex justify-center items-center px-4">Referral Code</p>
              <p className="text-sm flex justify-center items-center px-4">{`https://t.me/mad_tap_bot?start=${referralCode}`}</p>
            </div>
            <div className="flex justify-between py-3">
              <p className="font-bold flex justify-center px-4">Total Referrals</p>
              <p className="text-sm flex justify-center px-4">{referralPoints}</p>
            </div>
          </div>
        </div>
      }

      {
        currentView === 'leaderboard' &&
        <div className="flex flex-col h-[70vh] justify-center items-center">
          <p className="flex items-center justify-center text-white">Leaderboard</p>
          <Leaderboard data={leaderboardData} rowsPerPage={3} />
        </div>
      }
      <div className="w-full mx-auto h-[12vh] rounded-full absolute bottom-0 fixed">
        <div className="flex items-center justify-center h-full w-full sm:w-[90%] mx-auto">
          <div className="flex flex-col gap-1 items-center justify-center cursor-pointer text-xs border border-[#FFF] px-1 h-full text-[#FFF] w-1/3 rounded-tl-lg" onClick={() => {
            setCurrentView('play')
          }}>
            <GoldPlayIcon />
            <span>PLAY</span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center cursor-pointer text-xs border border-[#FFF] px-1 h-full text-[#FFF] w-1/3" onClick={() => {
            setCurrentView('referrals')
          }}>
            <GoldBarChartIcon />
            <span>REFERRALS</span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center cursor-pointer text-xs border border-[#FFF] px-1 h-full text-[#FFF] w-1/3 rounded-tr-lg" onClick={() => {
            setCurrentView('leaderboard')
          }}>
            <GoldTrophyIcon />
            <span>LEADERBOARD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
