import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index";

function DecksHeader({deck}) {
  const history = useHistory();

  async function handleDelete(deck) {
    const abortController = new AbortController();
    if (window.confirm(`Delete this deck? You will not be able to recover it`)) {
      await deleteDeck(deck.id, abortController.signal);
      return history.push("/");
    }
  }
  return (
    <div>
      <h4 className="my-4">{deck.name}</h4>
      <p>{deck.description}</p>
      <div className="d-flex justify-content-between">
        <div>
          <Link className="btn btn-secondary mr-2" to={`/decks/${deck.id}/edit`}>✏️ Edit</Link>
          <Link className="btn btn-primary mr-2" to={`/decks/${deck.id}/study`}>📖 Study</Link>
          <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>➕ Add Cards</Link>
        </div>
        <div>
          <button className="btn btn-danger" onClick={() => handleDelete(deck)}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}

export default DecksHeader;