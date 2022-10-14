import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api/index";

function Decks() {
  const [decks, setDecks] = useState([]);

  useEffect (() => {
    const abortController = new AbortController();

    async function getDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getDecks();

    return () => abortController.abort();
  }, []);

  async function handleDelete(deck) {
    const abortController = new AbortController();
    if (window.confirm(`Delete this deck? You will not be able to recover it`)) {
      await deleteDeck(deck.id, abortController.signal);
      const newDecks = await listDecks(abortController.signal);
      setDecks(newDecks);
    }
  }

  return (
      <div className="decks">
        {decks.map((deck) => {
          return (
            <div className="card" key={deck.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-middle">
                  <h4 className="card-title mt-0 pt-0">
                    {deck.name}
                  </h4>
                  <div className="card-subtitle mt-0 pt-0">
                    {deck.cards.length} cards
                  </div>
                </div>
                <div className="card-text mb-2">
                  {deck.description}
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <Link className="btn btn-secondary mr-2" to={`/decks/${deck.id}`}>
                      👀View
                    </Link>
                    <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
                      📖Study
                    </Link>
                  </div>
                  <div>
                    <button className="btn btn-danger" onClick={() => handleDelete(deck)}>
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
  );
}

export default Decks;