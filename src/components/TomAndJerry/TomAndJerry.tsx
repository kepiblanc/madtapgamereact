import React, { useRef } from 'react';
import './TomAndJerry.css';

const TomAndJerry = () => {
  const tomRef = useRef<any>(null);
  const jerryRef = useRef<any>(null);

  const startChase = () => {
    if (tomRef.current && jerryRef.current) {
      tomRef?.current?.classList.add('tom-chase');
      jerryRef?.current?.classList.add('jerry-chase');
    }
  };

  const stopChase = () => {
    if (tomRef.current && jerryRef.current) {
      tomRef.current.classList.remove('tom-chase');
      jerryRef.current.classList.remove('jerry-chase');
    }
  };

  return (
    <div>
      <svg width="500" height="300" viewBox="0 0 800 400">
        <circle ref={tomRef} cx="100" cy="200" r="40" fill="blue" />
        <circle ref={jerryRef} cx="700" cy="200" r="20" fill="brown" />
        <text x="80" y="230" fill="white" fontSize="20">Tom</text>
        <text x="680" y="230" fill="white" fontSize="10">Jerry</text>
      </svg>
      <button onClick={startChase}>Start Chase</button>
      <button onClick={stopChase}>Stop Chase</button>
    </div>
  );
};

export default TomAndJerry;
