import { ToastContainer } from "react-toastify";
import "./App.css";
import AnimatedBackground from "./components/Home/AnimatedBackground";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <AnimatedBackground />
    </>
  );
}

export default App;
