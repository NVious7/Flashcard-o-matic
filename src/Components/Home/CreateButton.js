import React from "react";
import { Link } from "react-router-dom";

function CreateButton() {
  return (
    <div className="row">
      <div className="col-sm-6 mb-2">
        <Link to="/decks/new" className="btn btn-secondary"><strong>➕ Create Deck</strong></Link>
      </div>
    </div>  
  )
}

export default CreateButton;