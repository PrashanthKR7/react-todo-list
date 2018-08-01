import AppDispatcher from "../AppDispatcher";
import constants from "../constants";
import API from "../api/Api";

let TaskActionCreators = {
  addTask(cardId, task) {
    AppDispatcher.dispatchAsync(
      API.addTask(cardId, task),
      {
        request: constants.CREATE_TASK,
        success: constants.CREATE_CARD_SUCCESS,
        failure: constants.CREATE_CARD_ERROR
      },
      { cardId, task }
    );
  },
  deleteTask(cardId, task, taskIndex) {
    AppDispatcher.dispatchAsync(
      API.deleteTask(cardId, task),
      {
        request: constants.DELETE_TASK,
        success: constants.DELETE_TASK_SUCCESS,
        failure: constants.DELETE_TASK_ERROR
      },
      { cardId, task, taskIndex }
    );
  },
  toggleTask(cardId, task, taskIndex) {
    AppDispatcher.dispatchAsync(
      API.toggleTask(cardId, task),
      {
        request: constants.TOGGLE_TASK,
        success: constants.TOGGLE_TASK_SUCCESS,
        failure: constants.TOGGLE_TASK_ERROR
      },
      { cardId, task, taskIndex }
    );
  }
};

export default TaskActionCreators;
