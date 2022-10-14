import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumb from "./Breadcrumb";
import StudyBody from "./StudyBody";



function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect (() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then(setDeck)

    return () => abortController.abort();
  }, [deckId]);

  if (!deck.id) {
    return <p>Loading...</p>
  } else if (deck.cards.length <= 2) {
    return (
      <div>
        <Breadcrumb deck={deck} />
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
        <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>➕ Add Cards</Link>
      </div>
    ) 
  } else {
    return (
      <div className="container">
        <Breadcrumb deck={deck} />
        <h1>Study: {deck.name}</h1>
        <StudyBody cards={deck.cards} />
      </div>
    )
  }
}

export default Study;