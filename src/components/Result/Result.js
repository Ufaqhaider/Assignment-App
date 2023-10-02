import React from "react";
import "./result.css";

const Result = ({ cards }) => {
  return (
    <div>
      <h2>Result Cards</h2>
      <div className="result-container">
        {cards.map((card, index) => (
          <div key={index} className="result-card">
            <img src={card.image} alt={`Card ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
