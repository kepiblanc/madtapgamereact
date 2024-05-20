import { useState } from "react";
import "./App.css";
import { helix } from 'ldrs'

helix.register()

function App() {
  const [helixSize, setHelixSize] = useState(60);

  return (
    <>
      <div className="w-full bg-[#092537] h-[10vh]">
        <div className="flex items-center justify-between h-full px-4">
          <h1 className="text-white text-4xl font-bold">MADTAP</h1>
          
          <h1 className="text-white text-md font-bold">245678 POINTS</h1>
        </div>
      </div>
      <div className="w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/madtapisto.png')` }}>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">TAP TO PLAY</h1>
          <div className="flex items-center justify-center w-auto" onClick={() => {
            console.log(helixSize)
            if (helixSize === 100) {
              setHelixSize(60)
            } else {
              setHelixSize(helixSize + 2)
            }
          }}>
            <l-helix
              size={`${helixSize}`}
              speed="2.5" 
              color="white" 
            ></l-helix>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#092537] h-[10vh]">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">Bare Rotten Init!</h1>
        </div>
      </div>
    </>
  );
}

export default App;
