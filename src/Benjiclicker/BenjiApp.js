import React, { useState, useEffect } from "react";
import "./BenjiApp.css";
import Cookie from "./components/Cookie/Cookie";
import TopBar from "./components/TopBar/TopBar";
import Shop from "./components/Shop/Shop";

function BenjiApp() {
  const [score, setScore] = useState(1000000000000);
  const [showApp, setShowApp] = useState(false);
  const [pointsToIncrease, setPointsToIncrease] = useState(1);
  const [autoClicksPerSecond, setAutoClicksPerSecond] = useState(0);
  const [cookieBurn, setCookieBurn] = useState(true);
  const [y, setY] = useState(0);
  const [pointMultiplier, setPointMultiplier] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prevScore) => prevScore + autoClicksPerSecond);
      setY((pre) => pre - 3);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClicksPerSecond]);

  useEffect(() => {
    if (y < 0) {
      setY(0);
    }
    if (y > 50) {
      setCookieBurn(false);
    } else {
      setCookieBurn(true);
    }
  }, [y]);

  const handleBenjiClick = () => {
    setScore((prevScore) => prevScore + pointsToIncrease * pointMultiplier);
    setY((pre) => pre + 1);
  };

  useEffect(() => {
    if (!cookieBurn) {
      setPointMultiplier(2);
    } else {
      setPointMultiplier(1);
    }
  }, [cookieBurn]);

  const handleShowAppClick = () => {
    setShowApp(true); // Set the showApp state to true when the button is clicked
  };

  return (
    <div className="App">
      {showApp ? (
        <>
          <TopBar score={score} autoClicksPerSecond={autoClicksPerSecond} />
          <Cookie
            onBenjiClick={handleBenjiClick}
            pointsToIncrease={pointsToIncrease}
            cookieBurn={cookieBurn}
            setCookieBurn={setCookieBurn}
            pointMultiplier={pointMultiplier}
          />
          <Shop
            setPointsToIncrease={setPointsToIncrease}
            pointsToIncrease={pointsToIncrease}
            setScore={setScore}
            score={score}
            setAutoClicksPerSecond={setAutoClicksPerSecond}
          />
        </>
      ) : (
        <button onClick={handleShowAppClick}>Show App</button>
      )}
    </div>
  );
}

export default BenjiApp;