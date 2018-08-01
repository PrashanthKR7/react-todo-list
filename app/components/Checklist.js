import React from "react";
import PropTypes from "prop-types";

const Checklist = ({ tasks, cardId, taskCallbacks }) => {
  tasks = tasks.map((task, taskIndex) => (
    <li key={task.id} className="checklist__task">
      <input
        type="checkbox"
        defaultChecked={task.done}
        onChange={taskCallbacks.toggle.bind(null, cardId, task.id, taskIndex)}
      />
      {task.name}
      <a
        href="#"
        onClick={taskCallbacks.delete.bind(null, cardId, task.id, taskIndex)}
        className="checklist__task--remove"
      />
    </li>
  ));

  const checkInputKeyPress = event => {
    if (event.key === "Enter") {
      taskCallbacks.add(cardId, event.target.value);
      event.target.value = "";
    }
  };

  return (
    <div className="checklist">
      <ul>{tasks}</ul>
      <input
        onKeyPress={checkInputKeyPress}
        type="text"
        className="checklist--add-task"
        placeholder="Type then hit Enter to add a task"
      />
    </div>
  );
};

Checklist.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default Checklist;
