import React, { FC, useState } from 'react';
import '../popup.css'; // Assuming you have some custom CSS for transitions

const ReferralPopup = () => {

  const [isVisible, setIsVisible] = useState(true);

  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <button
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={togglePopup}
      >
        Toggle Popup
      </button>

      <div
        className={`fixed bottom-0 left-0 w-full h-3/4 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Popup Content</h2>
          <p>This is the content of the popup.</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={togglePopup}
          >
            Close Popup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralPopup;
