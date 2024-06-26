import React, { useEffect, useRef, useState } from 'react';
import './wheelSpin.css';
import wheelSpinImg from '../../assets/wheelSpinNew.png';
import RangeInput from '../RangeInput/RangeInput';
import axios from 'axios';
import { API_URL } from '../../utils';
import GoldCoinIcon from '../GoldCoinIcon';
import ChevronDown from '../ChevronDown';
import { toast } from 'react-toastify';
import WheelChart from './WheelChart';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import CountdownTimer from '../CountdownTimer';

Chart.register(ArcElement, Tooltip, Legend);

const WheelSpin: React.FC<any> = ({user, playerLevel, gamePlayPoints, handleGamePointsUpdate, updateSpins}) => {
  const wheelRef = useRef<HTMLImageElement>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [floaters, setFloaters] = useState<any>([]);
  const [pointsNo, setPointsNo] = useState(1);
  const [spinsLeft, setSpinsLeft] = useState(0)

  useEffect (() => {
    const fetchUserData = async () => {
      const getUserData = await axios.post(`${API_URL}/get-user-data`, {user})
      console.log({getUserData})
      setSpinsLeft(getUserData?.data?.userData?.spinsLeft)
    }
    if (user) {
      fetchUserData();
    }
  }, [user])

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
  } 

  const spinWheel = (e: any) => {
    if (spinsLeft < 1) {
        toast.error('You have no wheel spins left for today');
        return;
    }
    if (isSpinning) return;

    setIsSpinning(true);

    const spinDuration = 6 //Math.floor(Math.random() * 5) + 7; // Random duration between 7 and 12 seconds
    const rotateDegrees = Math.floor(Math.random() * 360) + 3600;  //Random degrees + multiple spins

    // Reset the wheel rotation
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = 'rotate(0deg)';

      // Force reflow to reset the transition
      void wheelRef.current.offsetHeight; // This triggers a reflow, flushing the CSS changes

      // Apply the new rotation
      wheelRef.current.style.transition = `transform ${spinDuration}s ease-out`;
      wheelRef.current.style.transform = `rotate(${rotateDegrees}deg)`;
    }

    setTimeout(async () => {
      setIsSpinning(false);
      const finalRotation = 360 - (rotateDegrees % 360);
      let points = getPoints(finalRotation)

      console.log({finalRotation, rotateDegrees, points})

      setPointsNo(points);
      runFloaters(e)
      const updatePoints = await axios.post(`${API_URL}/update-tap-points`, {
        pointsNo: points,
        user
      })
      handleGamePointsUpdate(updatePoints?.data?.userData?.pointsNo)
      const recordSpin = await axios.post(`${API_URL}/spin`, {
        user
      })
      console.log(`Points: ${points}`, {updatePoints}, {recordSpin});
      setSpinsLeft(recordSpin?.data?.spinsLeft)
    }, spinDuration * 1000);
  };

  const handlePlayerLevel = (e: any) => {
    if (e <= 500000) return 'Rookie';
    if (e > 500000 && e <= 1250000) return 'Beginner';
    if (e > 1250000 && e <= 3500000) return 'Skilled';
    if (e > 3500000 && e <= 7000000) return 'Expert';
    if (e > 7000000 && e <= 21000000) return 'Legendary';
    if (e > 21000000) return 'Titan';
  }

  useEffect(() => {
    if (updateSpins.run) setSpinsLeft(updateSpins.spinsLeft)
  }, [updateSpins])

  /*const getPoints = (rotation: number): number => {
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
      { start: 330, end: 360, points: 10000 }
    ];

    for (let section of sections) {
      if (rotation >= section.start && rotation <= section.end) {
        return section.points;
      }
    }

    return 0;
  };*/

  const getPoints = (rotation: number): number => {
    const sections = [
      { start: 0, end: 15, points: 3000 },
      { start: 15, end: 45, points: 10000 },
      { start: 45, end: 75, points: 500 },
      { start: 75, end: 105, points: 7000 },
      { start: 105, end: 135, points: 17000 },
      { start: 135, end: 165, points: 50000 },
      { start: 165, end: 195, points: 100 },
      { start: 195, end: 225, points: 2000 },
      { start: 225, end: 255, points: 30000 },
      { start: 255, end: 285, points: 5000 },
      { start: 285, end: 315, points: 50 },
      { start: 315, end: 345, points: 4000 },
      { start: 345, end: 360, points: 3000 },
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
      '17000', '7000', '500', '10000'
    ],
    datasets: [
      {
        label: 'Points Distribution',
        data: Array(12).fill(1), // Each section has equal weight
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
        //borderColor: '#d9cd9d', // Custom border color
        //borderWidth: 5, // Custom border width
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

  const drawTextPlugin = {
    id: 'drawTextPlugin',
    afterDraw: (chart: { ctx?: any; data?: any; getDatasetMeta?: any; width?: any; height?: any; }) => {
      const ctx = chart.ctx;
      const { width, height } = chart;
      const { labels } = chart.data;
      const meta = chart.getDatasetMeta(0);
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = meta.data[0].outerRadius;

      labels.forEach((label: any, i: any) => {
        const arc = meta.data[i];
        const startAngle = arc.startAngle;
        const endAngle = arc.endAngle;
        const angle = startAngle + (endAngle - startAngle) / 2;
        const x = centerX + (radius / 1.5) * Math.cos(angle);
        const y = centerY + (radius / 1.5) * Math.sin(angle);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillStyle = `${i % 2 === 0 ? '#fffece' : '#960001'}`;
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, 0, 0);
        ctx.restore();
      });
    },
  };

  const outerBorderPlugin = {
    id: 'outerBorderPlugin',
    beforeDraw: (chart: any) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const { top, left, bottom, right } = chartArea;
      const { outerRadius } = chart.getDatasetMeta(0).data[0];

      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
      ctx.lineWidth = 5; // Set the border width
      ctx.strokeStyle = '#d9cd9d'; // Set the border color
      ctx.stroke();
      ctx.restore();
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
        {
            gamePlayPoints &&
            <div className="flex gap-4 items-center justify-center w-full">
                <h1 className="font-neuropol text-white text-sm font-bold">{handlePlayerLevel(gamePlayPoints)}</h1>
                <ChevronDown />
            </div>
        }
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
              <img src={wheelSpinImg} alt="Wheel" />
            </div>
            {/*<div ref={wheelRef} className="wheel">
              <Pie data={data} options={options} width={250} height={250} plugins={[drawTextPlugin, outerBorderPlugin]} />
            </div>*/}
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
        {spinsLeft === 0 && <CountdownTimer />}
      </div>
    </div>
  );
};

export default WheelSpin;
