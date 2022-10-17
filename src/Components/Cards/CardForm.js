import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readCard, updateCard, createCard } from "../../utils/api/index";

function CardForm({deck}) {
  const {url} = useRouteMatch();
  const history = useHistory();
  const {cardId} = useParams();

  const initialCardState = {
    front: "",
    back: "",
  };

  const [card, setCard] = useState(initialCardState);

  useEffect (() => {
    const abortController = new AbortController();

    if (!url.includes("new")) {
      readCard(cardId, abortController.signal).then(setCard);
    }

    return () => abortController.abort();
  }, [cardId, url]);

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

  function handleCancel() {
    history.push(`/decks/${deck.id}`);
  }

  function handleSubmitEdit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    updateCard({...card}, abortController.signal);
    history.push(`/decks/${deck.id}`);

    return () => abortController.abort();
  }

  if (url.includes("new")) {
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
  } else {
    return (
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">🏠 Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{`Edit Card ${card.id}`}</li>
        </ol>
        <h4 className="mb-4">{`${deck.name}: Add Card`}</h4>
      <form onSubmit={handleSubmitEdit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea className="form-control" id="front" name="front" placeholder="Front side of card" onChange={handleChange} value={card.front}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea className="form-control" id="back" name="back" placeholder="Back side of card" onChange={handleChange} value={card.back}></textarea>
        </div>
        <button className="btn btn-secondary mr-2" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-primary" type="submit">Save</button>
      </form>
      </div>
    )
  }
}

export default CardForm;