import React from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import CardsNew from "./CardsNew";
import CardsEdit from "./CardsEdit";

function Cards() {
  const {url} = useRouteMatch();
  const {deckId} = useParams();

  return (
    <Switch>
      <Route path={`${url}/new`}>
        <CardsNew deckId={deckId} />
      </Route>
      <Route path={`${url}/:cardId/edit`}>
        <CardsEdit deckId={deckId} />
      </Route>
    </Switch>
  )
}

export default Cards;