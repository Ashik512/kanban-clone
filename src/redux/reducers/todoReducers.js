import uuid4 from "uuid4";
import { ActionTypes } from "../constants/action-types";

const initialState = !localStorage.todos
  ? [
      {
        id: uuid4(),
        title: "JS",
        status: "todo",
      },
    ]
  : JSON.parse(localStorage.todos);

export const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [...state, action.payload];
    case "ALL_TODO":
      return action.payload;
    case ActionTypes.DELETE_TODO:
      return state;
    case ActionTypes.TOGGLE_TODO:
      return state;
    default:
      return state;
  }
};
