// src/FloatingPlusOne.jsx
import React, { FC, useState } from 'react';
import '../floatAnimation.css';
import { helix } from 'ldrs'

helix.register()

interface Props {
    helixSize: any;
}

const FloatingPlusOne:FC<Props> = ({helixSize}) => {
  const [floaters, setFloaters] = useState<any>([]);

  const handleClick = (e: any) => {
    const newFloat = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setFloaters([...floaters, newFloat]);

    // Remove the floater after the animation ends
    setTimeout(() => {
      setFloaters((prev: any) => prev.filter((floater: any) => floater.id !== newFloat.id));
    }, 2000); // Match this duration with the animation duration
  };

  return (
    <div className="w-full" onClick={handleClick}>
      {floaters.map((floater: any) => (
        <span
          key={floater.id}
          className="absolute text-2xl text-[#FFF] font-bold"
          style={{
            left: floater.x,
            top: floater.y,
            animation: 'floatAndFade 2s forwards',
          }}
        >
          +1
        </span>
      ))}
      <div className="flex items-center justify-center">
        <l-helix
            size={`${helixSize}`}
            speed="2.5" 
            color="white" 
        ></l-helix>
      </div>
    </div>
  );
};

export default FloatingPlusOne;
