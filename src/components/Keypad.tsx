import React, { useState, useEffect, FC } from 'react';
import FloatingPlusOne from './FloatingPlusOne';

const Keypad:FC<any> = ({helixColor, pointsNo}) => {
  const [randomIndex, setRandomIndex] = useState<any>(null);
  const placeholderElement = <FloatingPlusOne helixColor={helixColor} pointsNo={pointsNo} />;

  // Function to get a random number between 0 and 8 (inclusive)
  const getRandomIndex = () => Math.floor(Math.random() * 9);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomIndex(getRandomIndex());
    }, 2000 + Math.random() * 1000); // 2-3 seconds interval

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const keypadButtons = Array.from({ length: 9 }, (_, i) => (
    <div
      key={i}
      className="w-1/4 h-16 flex items-center justify-center bg-gray-200 border rounded m-1"
    >
      {i === randomIndex ? placeholderElement : i + 1}
    </div>
  ));

  return (
    <div className="flex flex-wrap justify-center mt-10 w-[80%] mx-auto">
      {keypadButtons}
    </div>
  );
};

export default Keypad;
