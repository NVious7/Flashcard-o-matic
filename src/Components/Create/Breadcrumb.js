import React from "react";
import {Link} from "react-router-dom";

function Breadcrumb() {
  return (
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/">🏠 Home</Link>
      </li>
      <li className="breadcrumb-item active">
        Create Deck
      </li>
    </ol>
  )
}

export default Breadcrumb;