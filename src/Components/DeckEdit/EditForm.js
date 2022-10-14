import React from "react";
import { useHistory } from "react-router-dom";
import { updateDeck } from "../../utils/api";

function EditForm({deck, setDeck}) {
  const history = useHistory(); 

  function handleChange({target}) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    updateDeck({...deck}, abortController.signal);

    history.push(`/decks/${deck.id}`);
  }

  function handleCancel() {
    return history.push(`/decks/${deck.id}`);
  }
  
  return (
    <div>
      <h1 className="mb-4">Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" id="name" name="name" type="text" value={deck.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" name="description" rows="4" value={deck.description} onChange={handleChange}></textarea>
        </div>
        <button className="btn btn-secondary mr-2" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default EditForm;