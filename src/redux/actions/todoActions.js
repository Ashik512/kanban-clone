import uuid4 from "uuid4";
import { ActionTypes } from "../constants/action-types";

export const AddTodoAction = (todo) => (dispatch) => {
  dispatch({
    type: ActionTypes.ADD_TODO,
    payload: { id: uuid4(), title: todo, status: "todo" },
  });
};

export const deleleTodo = (id) => (dispatch) => {
  dispatch({
    type: ActionTypes.DELETE_TODO,
    payload: { id },
  });
};

export const updateTodo = (todo) => (dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_TODO,
    payload: todo,
  });
};

export const transferTodo =
  ({ id, status }) =>
  (dispatch) => {
    dispatch({
      type: ActionTypes.TOGGLE_TODO,
      payload: { id, status },
    });
  };
