import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import Breadcrumb from "./Breadcrumb";
import EditForm from "./EditForm";

function DeckEdit() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect (() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId]);

  if (!deck.id) {
    return <p>Loading...</p>
  } else {
    return (
      <div className="container">
        <Breadcrumb deck={deck} />
        <EditForm deck={deck} setDeck={setDeck} />
      </div>
    )
  }
}

export default DeckEdit;