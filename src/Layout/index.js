import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/Home/Home";
import Study from "../Components/Study/Study";
import Create from "../Components/Create/Create";
import Decks from "../Components/Decks/Decks";
import DeckEdit from "../Components/DeckEdit/DeckEdit";
import Cards from "../Components/Cards/Cards";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/decks/:deckId/cards">
            <Cards />
          </Route>

          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/new">
            <Create />
          </Route>

          <Route path="/decks/:deckId">
            <Decks />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
