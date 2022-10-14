import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

function CreateDeck() {
  const history = useHistory();
  const initialState = {
    name: "",
    description: "",
  }

  const [deck, setDeck] = useState(initialState);

  function handleChange({target}) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  function handleCancel() {
    return history.push("/");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    createDeck({...deck}, abortController.signal);

    history.push("/");

    return () => abortController.abort();
  }

  return (
    <div>
      <h1 className="mb-4">Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" id="name" name="name" type="text" onChange={handleChange} value={deck.name} placeholder="Deck Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" name="description" rows="4" onChange={handleChange} value={deck.description} placeholder="Brief description of the deck"></textarea>
        </div>
        <button className="btn btn-secondary mr-2" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateDeck;