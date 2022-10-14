import React from "react";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import { deleteCard, readDeck } from "../../utils/api/index";


function Cards({cards, setCards}) {
  const {url} = useRouteMatch();
  const history = useHistory();

  async function handleDeleteCard(card) {
    const abortController = new AbortController();
    if (window.confirm(`Delete this card? You will not be able to recover it.`)) {
      await deleteCard(card.id, abortController.signal);
      readDeck(card.deckId, abortController.signal).then((response) => setCards(response.cards));
    }
  }

  return (
    <div>
      <h2 className="mt-4">Cards</h2>
      {cards.map((card) => {
        return (
          <div className="card" key={card.id}>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col">{card.front}</div>
                <div className="col">{card.back}</div>
              </div>
              <div className="d-flex justify-content-end">
                <Link className="btn btn-secondary mr-2" to={`${url}/cards/${card.id}/edit`}>✏️ Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDeleteCard(card)}>🗑️</button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cards;