import React from "react";
import PropTypes from "prop-types";

const CardForm = props => {
  const handleClose = e => {
    e.preventDefault();
    props.handleClose();
  };

  return (
    <div>
      <div className="card big">
        <form onSubmit={props.handleSubmit}>
          <input
            type="text"
            value={props.draftCard.title}
            onChange={e => {props.handleChange("title", e.target.value)}}
            placeholder="Title"
            required={true}
            autoFocus={true}
          />
          <textarea
            value={props.draftCard.description}
            onChange={e => props.handleChange("description", e.target.value)}
            placeholder="Description"
            required={true}
          />
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={props.draftCard.status}
            onChange={e => props.handleChange("status", e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <br />
          <label htmlFor="color">Color</label>
          <input
            id="color"
            value={props.draftCard.color || '#ff0000'}
            onChange={e => props.handleChange("color", e.target.value)}
            type="color"
          />
          <div className="actions">
            <button type="submit">{props.buttonLabel}</button>
          </div>
        </form>
      </div>
      <div className="overlay" onClick={e => handleClose(e)} />
    </div>
  );
};

CardForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  draftCard: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};
export default CardForm;
