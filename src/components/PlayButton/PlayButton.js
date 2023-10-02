import React, { useEffect, useState } from "react";
import "./playButton.css";

const PlayButton = ({ startGame, gameStarted, changeCard }) => {
  const [shakeButton, setShakeButton] = useState(false);
  const [hasChangedCard, setHasChangedCard] = useState(false);

  const shakePlayButton = () => {
    setShakeButton(true);
    setTimeout(() => {
      setShakeButton(false);
    }, 500);
  };

  useEffect(() => {
    if (gameStarted && !hasChangedCard) {
      changeCard();
      setHasChangedCard(true);
    } else if (!gameStarted) {
      shakePlayButton();
      setHasChangedCard(false);
    }
  }, [gameStarted, changeCard, hasChangedCard]);

  return (
    <div>
      <button
        onClick={startGame}
        className={` mx-5 btn btn-primary btn-lg ${shakeButton ? "shake" : ""}`}
        disabled={gameStarted}
      >
        Play
      </button>
    </div>
  );
};

export default PlayButton;
