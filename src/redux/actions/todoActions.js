import uuid4 from "uuid4";
import { ActionTypes } from "../constants/action-types";

export const AddTodoAction = (todo) => (dispatch) => {
  dispatch({
    type: ActionTypes.ADD_TODO,
    payload: { id: uuid4(), title: todo, status: "todo" },
  });
};
