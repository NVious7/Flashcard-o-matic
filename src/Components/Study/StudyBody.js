import React, { useState, useEffect } from "react";
import { readCard } from "../../utils/api/index";
import { useHistory } from "react-router-dom";

function StudyBody({cards}) {
  const [cardIndex, setCardIndex] = useState(0);
  const [cardState, setCardState] = useState(true);
  const [currentCard, setCurrentCard] = useState(cards[0]);
  const history = useHistory();

  const cardId = cards[cardIndex].id;

  useEffect(() => {
    setCurrentCard({});
    const abortController = new AbortController();

    readCard(cardId, abortController.signal).then(setCurrentCard);

    return () => abortController.abort();
  }, [cardId]);

  const handleFlip = () => {
    setCardState(!cardState);
  }

  const handleNext = () => {
    setCardIndex(cardIndex+ 1);
    setCardState(true);
    if (cardIndex === cards.length - 1) {
      if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
        return setCardIndex(0);
      } else {
        return history.push("/");
      }
    }
  }
  
  if (cardState) {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">
            {`Card ${cardIndex + 1} of ${cards.length}`}
          </h4>
          <p className="card-text">
            {currentCard.front}
          </p>
          <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">
            {`Card ${cardIndex + 1} of ${cards.length}`}
          </h4>
          <p className="card-text">
            {currentCard.back}
          </p>
          <button className="btn btn-secondary mr-2" onClick={handleFlip}>Flip</button>
          <button className="btn btn-primary" onClick={handleNext}>Next</button>
        </div>
      </div>
    )
  }
}


export default StudyBody;