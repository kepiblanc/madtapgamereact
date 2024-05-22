import { FC } from "react";

interface Props {
    fillColor: string;
}

const SpongeBobIcon:FC<Props> = ({ fillColor }) => {
  return (
    <svg width={'100'} height={'100'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill={fillColor}>
      {/* Body */}
      <rect x="30" y="50" width="140" height="100" rx="20" ry="20"/>
      {/* Eyes */}
      <circle cx="70" cy="90" r="15" fill="#fff"/>
      <circle cx="130" cy="90" r="15" fill="#fff"/>
      <circle cx="70" cy="90" r="5"/>
      <circle cx="130" cy="90" r="5"/>
      {/* Mouth */}
      <path d="M60,120 Q100,140 140,120" stroke="#000" fill="transparent"/>
      {/* Pants */}
      <rect x="30" y="120" width="140" height="30" fill="#800000"/>
      {/* Tie */}
      <polygon points="100,120 90,150 110,150" fill="red"/>
    </svg>
  );
};

export default SpongeBobIcon;
