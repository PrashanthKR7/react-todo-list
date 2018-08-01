import React from "react";
import PropTypes from "prop-types";
import TaskActionCreators from "../actions/TaskActionCreators";

const Checklist = ({ tasks, cardId, taskCallbacks }) => {
  tasks = tasks.map((task, taskIndex) => (
    <li key={task.id} className="checklist__task">
      <input
        type="checkbox"
        defaultChecked={task.done}
        onChange={TaskActionCreators.toggleTask.bind(null, cardId, task.id, taskIndex)}
      />
      {task.name}
      <a
        href="#"
        onClick={TaskActionCreators.deleteTask.bind(null, cardId, task.id, taskIndex)}
        className="checklist__task--remove"
      />
    </li>
  ));

  const checkInputKeyPress = event => {
    if (event.key === "Enter") {
      let newTask = { id: Date.now(), name: evt.target.value, done: false };
      TaskActionCreators.addTask(this.props.cardId, newTask);
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
  tasks: PropTypes.arrayOf(PropTypes.object)
};

export default Checklist;
