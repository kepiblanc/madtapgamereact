import React, { useState, useEffect } from 'react';

// Utility function to get time until next midnight
const getTimeUntilNextMidnight = () => {
  const now: any = new Date();
  const nextMidnight: any = new Date();
  nextMidnight.setHours(24, 0, 0, 0);
  return nextMidnight - now;
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilNextMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: any) => {
    const hours = String(Math.floor((time / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="h-auto font-neuropol">
      <div className="text-center text-white">
        <h1 className="text-xs font-bold">You can spin again in</h1>
        <div className="text-xs">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
