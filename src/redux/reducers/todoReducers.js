import { ActionTypes } from "../constants/action-types";

const initialState = !localStorage.todos ? [] : JSON.parse(localStorage.todos);

export const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [...state, action.payload];

    case ActionTypes.DELETE_TODO:
      return state.filter((todo) => todo.id != action.payload.id);

    case ActionTypes.UPDATE_TODO:
      return state.map((todo) => {
        const { id, title } = action.payload;
        if (todo.id == id) {
          return {
            ...todo,
            title,
          };
        } else {
          return todo;
        }
      });

    case ActionTypes.TOGGLE_TODO:
      return state.map((todo) => {
        const { id, status } = action.payload;
        if (todo.id == id) {
          return {
            ...todo,
            status: status,
          };
        } else {
          return todo;
        }
      });

    default:
      return state;
  }
};
