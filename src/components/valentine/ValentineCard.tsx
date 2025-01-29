import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function ValentineCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [explode, setExplode] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false);

  const moveNoButton = () => {
    if (clickCount >= 2) {
      setExplode(true);
      setShowGif(true);
      setTimeout(() => setShowGif(false), 1000); // Hide GIF after 1 second
      return;
    }
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 200) - 100;
    setNoPosition({ x: randomX, y: randomY });
    setClickCount(clickCount + 1);
  };

  const handleYesClick = () => {
    setShowConfetti(true);
  };

  return (
    <>
      {showConfetti &&
        <Confetti
          width={width}
          height={height}
        />
      }
      <motion.div
        animate={{ rotateY: isOpen ? 0 : 15 }}
        className="relative w-64 h-96 perspective-1000" onClick={() => setIsOpen(true)}
      >
        <motion.div
          className="absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center px-4 flex flex-col gap-4"
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: "left" }}
        >
          {!showConfetti ? <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZndhMGF3d2IyNXk1Y2Q2aTAydHJ2eGh5anF2OGZtZG56eGU1Y2p2diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/iAIwyKeZlKBgIpH4TZ/giphy.gif"
            alt="Valentine" className="w-24 h-24 absolute bottom-0"
          /> : <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHluYmJqZjl6bjd3a2gxMWRpYWxnM2MxZDBhNGRlbDVkaDNzazJkNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/BXjqytvu9bKzCUHdzz/giphy.gif"
            alt="Valentine" className="w-24 h-24 absolute bottom-0"
          />}
          <h1 className="text-rose-500 text-xl font-semibold mb-4">
            Will you be my valentine?
          </h1>
          <button
            className="px-4 py-2 bg-rose-500 text-white font-bold rounded-lg shadow-md hover:bg-rose-600 transition duration-200"
            onClick={handleYesClick}
          >
            Yes
          </button>
          {!explode ? (
            <motion.button
              className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ duration: 0.3 }}
              onClick={moveNoButton}
            >
              No
            </motion.button>
          ) : (
            showGif && (
              <motion.img
                src="https://i.gifer.com/3IsK.gif"
                alt="Explosion"
                className="w-24 h-24 absolute"
                animate={{ x: noPosition.x, y: noPosition.y }}
                transition={{ duration: 0.0 }}
              />
            )
          )}
        </motion.div>
        <motion.div
          className="absolute w-full h-full bg-rose-500 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold px-4"
          animate={{ rotateY: isOpen ? -180 : 0, opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: "left" }}
        >
          Dear Senior Manager,<br />
          You have a message
        </motion.div>
      </motion.div>
    </>
  );
}

