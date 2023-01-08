import uuid4 from "uuid4";
import { ActionTypes } from "../constants/action-types";

export const AddTodoAction = (todo) => {
    return {
      type: ActionTypes.ADD_TODO,
      payload: { id: uuid4(), title: todo, status: "todo" },
    };
};

export const setTodos = (todos) => {
  console.log("t",todos);
    return {
      type: 'ALL_TODO',
      payload: todos
    };
};
