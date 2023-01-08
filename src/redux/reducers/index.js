import { combineReducers } from "redux";
import { TodoReducer } from "./todoReducers";

const reducers = combineReducers({
  //all reducer container
  Todos: TodoReducer,
});

export default reducers;
