import React, { useState } from "react";
import "./cards.css";
import Arrow from "../../assets/Arrow.svg";
import DownArrow from "../../assets/DownArrow.svg";
import CardList from "../CardList";
import Result from "../Result/Result";
import PlayButton from "../PlayButton/PlayButton";
import { ToastManager } from "../../ToastContainer/ToastContainer";

const Cards = () => {
  const [currentCard, setCurrentCard] = useState(null);
  const [collectedCards, setCollectedCards] = useState([]);
  const [userPrediction, setUserPrediction] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const changeCard = (prediction) => {
    const randomIndex = Math.floor(Math.random() * CardList.length);
    const newCard = CardList[randomIndex];

    if (gameStarted) {
      if (currentCard) {
        if (
          (prediction === "higher" && newCard.id >= currentCard.id) ||
          (prediction === "lower" && newCard.id <= currentCard.id)
        ) {
          setPredictionResult("correct");
        } else {
          setPredictionResult("incorrect");
          ToastManager.error(
            "Oops, Wrong Prediction, now refresh the page and click the Play button to start over"
          );
        }
      }

      setCollectedCards((prevCards) => [...prevCards, newCard]);
      setCurrentCard(newCard);
      setUserPrediction(prediction);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex align-items-baseline">
        <div className="col-md-4">
          <PlayButton
            startGame={startGame}
            gameStarted={gameStarted}
            changeCard={changeCard}
          />
        </div>
        <div className="col-md-6">
          <div className="card-btn-container  d-flex justify-content-around align-items-center w-100">
            <div className=" card-btn-box text-center">
              <button
                className={`estimate-btn cursor-pointer ${
                  userPrediction === "higher"
                    ? predictionResult === "correct"
                      ? "active"
                      : "incorrect"
                    : ""
                }`}
                onClick={() => changeCard("higher")}
                disabled={predictionResult === "incorrect"}
              >
                <img src={Arrow} className="pe-2 mt-4 mb-3" alt="" />
                <p className="lh-sm">HIGHER OR SAME</p>
                <div className="payout">x1.26</div>
              </button>
            </div>

            <div className="card-btn-box">
              <div className="card-box">
                {Array.from({ length: 8 }, (_, index) => (
                  <div
                    key={`dummy-card${index}`}
                    className={`dummy-cards dummy-card${index + 1}`}
                  ></div>
                ))}
                {currentCard ? (
                  <img
                    src={currentCard.image}
                    className="card-img"
                    style={{ height: "fit-content", boxShadow: "none" }}
                    alt=""
                  />
                ) : (
                  <div>No card selected</div>
                )}
              </div>
            </div>

            <div className=" card-btn-box text-center">
              <button
                className={`estimate-btn cursor-pointer ${
                  userPrediction === "lower"
                    ? predictionResult === "correct"
                      ? "active"
                      : "incorrect"
                    : ""
                }`}
                onClick={() => changeCard("lower")}
                disabled={predictionResult === "incorrect"}
              >
                <img src={DownArrow} className="pe-2 mt-4 mb-3" alt="" />
                <p className="lh-sm">LOWER OR SAME</p>
                <div className="payout">x1.26</div>
              </button>
            </div>
          </div>
          {<Result cards={collectedCards} />}
        </div>
      </div>
    </div>
  );
};

export default Cards;
