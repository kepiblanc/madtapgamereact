import { FC } from 'react';
import './RangeInput.css'; // Import the custom CSS for range input

interface Props {
    rangeValue: number;
}

const RangeInput:FC<Props> = ({ rangeValue }) => {
  return (
    <div className="flex items-center justify-center w-[90%] mw-auto">
      <div className="w-full p-4 flex gap-2 items-center justify-center">
        <input
          id="rangeInput"
          type="range"
          className="rounded-full custom-range"
          min="0"
          max="100"
          value={rangeValue}
        />
        <span className="text-[#FFF]">{rangeValue}</span>
      </div>
    </div>
  );
};

export default RangeInput;
