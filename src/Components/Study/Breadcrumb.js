import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({deck}) {
  return (
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/">🏠 Home</Link>
      </li>
      <li className="breadcrumb-item">
        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
      </li>
      <li className="breadcrumb-item active">
        Study
      </li>
    </ol>
  );
}

export default Breadcrumb;