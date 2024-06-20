import React, { useEffect, useRef, useState } from 'react';
import './wheelSpin.css';
import RangeInput from '../RangeInput/RangeInput';
import axios from 'axios';
import { API_URL } from '../../utils';
import GoldCoinIcon from '../GoldCoinIcon';
import ChevronDown from '../ChevronDown';
import { toast } from 'react-toastify';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import imageSrc from '../../assets/badgeOne.png'; // Replace with your actual image import

Chart.register(ArcElement, Tooltip, Legend);

const WheelSpinNew: React.FC<any> = ({ user, playerLevel, gamePlayPoints, handleGamePointsUpdate }) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [floaters, setFloaters] = useState<any>([]);
  const [pointsNo, setPointsNo] = useState(1);
  const [spinsLeft, setSpinsLeft] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const getUserData = await axios.post(`${API_URL}/get-user-data`, { user });
      setSpinsLeft(getUserData?.data?.userData?.spinsLeft);
    };
    if (user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    // Generate a random rotation angle between 0 and 360
    const randomRotation = Math.floor(Math.random() * 360);
    setRotation(randomRotation);
  }, []);

  const runFloaters = (e: any) => {
    const newFloat = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setFloaters([...floaters, newFloat]);

    // Remove the floater after the animation ends
    setTimeout(() => {
      setFloaters((prev: any) => prev.filter((floater: any) => floater.id !== newFloat.id));
    }, 2000);
  };

  const spinWheel = (e: any) => {
    if (isSpinning) return;

    setIsSpinning(true);

    const spinDuration = 6;
    const rotateDegrees = Math.floor(Math.random() * 360) + 3600;

    // Reset the wheel rotation
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = 'rotate(0deg)';

      // Force reflow to reset the transition
      void wheelRef.current.offsetHeight;

      // Apply the new rotation
      wheelRef.current.style.transition = `transform ${spinDuration}s ease-out`;
      wheelRef.current.style.transform = `rotate(${rotateDegrees}deg)`;
    }

    setTimeout(async () => {
      setIsSpinning(false);
      const finalRotation = 360 - (rotateDegrees % 360);
      let points = getPoints(finalRotation);

      console.log({ finalRotation, rotateDegrees, points });

      setPointsNo(points);
      runFloaters(e);
      /*const updatePoints = await axios.post(`${API_URL}/update-tap-points`, {
        pointsNo: points,
        user
      })
      handleGamePointsUpdate(updatePoints?.data?.userData?.pointsNo)
      const recordSpin = await axios.post(`${API_URL}/spin`, {
        user
      })
      console.log(`Points: ${points}`, {updatePoints}, {recordSpin});
      setSpinsLeft(recordSpin?.data?.spinsLeft)*/
    }, spinDuration * 1000);
  };

  const handlePlayerLevel = (e: any) => {
    if (e <= 500000) return 'Rookie';
    if (e > 500000 && e <= 1250000) return 'Beginner';
    if (e > 1250000 && e <= 3500000) return 'Skilled';
    if (e > 3500000 && e <= 7000000) return 'Expert';
    if (e > 7000000 && e <= 21000000) return 'Legendary';
    if (e > 21000000) return 'Titan';
  };

  const getPoints = (rotation: number): number => {
    const sections = [
      { start: 0, end: 30, points: 3000 },
      { start: 30, end: 60, points: 50 },
      { start: 60, end: 90, points: 5000 },
      { start: 90, end: 120, points: 30000 },
      { start: 120, end: 150, points: 2000 },
      { start: 150, end: 180, points: 4000 },
      { start: 180, end: 210, points: 100 },
      { start: 210, end: 240, points: 50000 },
      { start: 240, end: 270, points: 17000 },
      { start: 270, end: 300, points: 7000 },
      { start: 300, end: 330, points: 500 },
      { start: 330, end: 360, points: 10000 },
    ];

    for (let section of sections) {
      if (rotation >= section.start && rotation <= section.end) {
        return section.points;
      }
    }

    return 0;
  };

  const data = {
    labels: [
      '3000', '50', '5000', '30000',
      '2000', '4000', '100', '50000',
      '17000', '7000', '500', '10000',
    ],
    datasets: [
      {
        label: 'Points Distribution',
        data: Array(12).fill(1),
        backgroundColor: [
          '#960001', '#fffece', '#960001', '#fffece',
          '#960001', '#fffece', '#960001', '#fffece',
          '#960001', '#fffece', '#960001', '#fffece',
        ],
        hoverBackgroundColor: [
          '#960001', '#fffece', '#960001', '#fffece',
          '#960001', '#fffece', '#960001', '#fffece',
          '#960001', '#fffece', '#960001', '#fffece',
        ],
      },
    ],
  };

  const options: any = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const calculateTextPositions = () => {
    const positions = [];
    const sections = data.labels.length;
    const angleStep = (2 * Math.PI) / sections;

    for (let i = 0; i < sections; i++) {
      // Adding 15 degrees to the angle to position the first label between 12 and 1 o'clock
      const angle = i * angleStep + (15 * (Math.PI / 180)) + (rotation * (Math.PI / 180));
      positions.push({
        angle,
        label: data.labels[i],
      });
    }

    return positions;
  };

  const positions = calculateTextPositions();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      {gamePlayPoints && (
        <div className="flex gap-4 items-center justify-center w-full">
          <h1 className="font-neuropol text-white text-sm font-bold">{handlePlayerLevel(gamePlayPoints)}</h1>
          <ChevronDown />
        </div>
      )}
      <div className="flex gap-4 items-center justify-center w-full">
        <GoldCoinIcon />
        <h1 className="font-neuropol text-white text-xs font-bold">{gamePlayPoints} Gold</h1>
      </div>
      <div>
        {floaters.map((floater: any) => (
          <span
            key={floater.id}
            className="absolute text-sm text-[#FFF] font-neuropol"
            style={{
              left: floater.x,
              top: floater.y,
              animation: 'floatAndFade 2s forwards',
            }}
          >
            +{pointsNo}
          </span>
        ))}
      </div>
      <div className="wheel-container relative">
        <div ref={wheelRef} className="wheel">
          <Pie data={data} options={options} width={250} height={250} />
          {positions.map((pos, index) => (
            <div
              key={index}
              className="absolute text-center text-white font-bold flex items-center justify-center"
              style={{
                transform: `rotate(${(pos.angle * 180) / Math.PI - 75}deg)`, // Rotate the text correctly
                transformOrigin: 'center center',
                left: '50%',
                top: '50%',
                height: '100px',
                marginLeft: '-50px',
              }}
            >
              <img src={imageSrc} alt="icon" className="w-6 h-6 mr-1" />
              <span>{pos.label}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer"></div>
      </div>
      <div>
        <button
          onClick={spinWheel}
          className="font-neuropol px-4 py-2 bg-[#00B806] text-white rounded"
          disabled={isSpinning}
        >
          Mine
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <p className="font-neuropol text-white">{spinsLeft}/3 Spins</p>
        <RangeInput rangeValue={(spinsLeft / 3) * 100} />
      </div>
    </div>
  );
};

export default WheelSpinNew;
