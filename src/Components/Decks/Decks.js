import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import Breadcrumb from "./Breadcumb";
import DecksHeader from "./DecksHeader";
import Cards from "./Cards";

function Decks() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect (() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
    .then((response) => {
      setDeck(response);
      setCards(response.cards);
    })

    return () => abortController.abort();
  }, [deckId]);

  if (!deck.id) {
    return <p>Loading...</p>
  } else {
    return (
    <div className="container">
      <Breadcrumb deck={deck} />
      <DecksHeader deck={deck} />
      <Cards cards={cards} setCards={setCards} />
    </div>
    )
  }
}

export default Decks;