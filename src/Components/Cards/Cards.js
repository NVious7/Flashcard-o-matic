import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardForm from "./CardForm";

function Cards() {
  const {url} = useRouteMatch();
  const {deckId} = useParams();
  const[deck, setDeck] = useState({});

  useEffect (() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId]);

  if (!deck.id) {
    return <p>Loading...</p>
  } else {
    return (
      <Switch>
        <Route path={`${url}/new`}>
          <CardForm deck={deck} />
        </Route>
        <Route path={`${url}/:cardId/edit`}>
          <CardForm deck={deck} />
        </Route>
      </Switch>
    )
  }
}

export default Cards;