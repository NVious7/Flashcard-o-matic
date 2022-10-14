import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index";

function CardsNew({deckId}) {
  const history = useHistory();
  const initialCardState = {
    front: "",
    back: "",
  };

  const [card, setCard] = useState(initialCardState);
  const [deck, setDeck] = useState({});

  useEffect (() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId]);

  function handleChange({target}) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  function handleDone() {
    history.push(`/decks/${deck.id}`)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    await createCard(deck.id, {...card}, abortController.singal);
    setCard(initialCardState);
    

    return () => abortController.abort();
  }

  if (!deck.id) {
    return <p>Loading...</p>
  } else {
    return (
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">🏠 Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
        <h4 className="mb-4">{`${deck.name}: Add Card`}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea className="form-control" id="front" name="front" placeholder="Front side of card" onChange={handleChange} value={card.front}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea className="form-control" id="back" name="back" placeholder="Back side of card" onChange={handleChange} value={card.back}></textarea>
        </div>
        <button className="btn btn-secondary mr-2" onClick={handleDone}>Done</button>
        <button className="btn btn-primary" type="submit">Save</button>
      </form>
      </div>
    )
  }
}

export default CardsNew;