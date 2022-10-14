import React from "react";
import CreateButton from "./CreateButton";
import Decks from "./Decks";


function Home() {
  return (
    <div className="container">
      <CreateButton />
      <Decks />
    </div>
  )
}

export default Home;