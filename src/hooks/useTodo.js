import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTodoAction } from "../redux/actions/todoActions";

export default function useTodo() {
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const inputElement = useRef();

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.Todos);

  const dragStarted = (e, id) => {
    console.log("drag started with Id: ", id);
    e.dataTransfer.setData("tId", id);
  };

  const draggingOverInTodo = (e) => {
    e.preventDefault();
    console.log("Draging over In Todo");
  };

  const draggingOverInProgress = (e) => {
    e.preventDefault();
    console.log("Draging over In Progress");
  };

  const draggingOverInCompleted = (e) => {
    e.preventDefault();
    console.log("Draging over In Completed");
  };

  const transferTodo = (id, status) => {
    // setTodos(
    //   todos.map((todo) => {
    //     if (todo.id == id) {
    //       return {
    //         ...todo,
    //         status: status,
    //       };
    //     } else {
    //       return todo;
    //     }
    //   })
    // );
  };

  const dragDroppedInTodo = (e) => {
    e.preventDefault();
    console.log("You have dropped In Todo");
    const tId = e.dataTransfer.getData("tId");
    console.log("tId", tId);
    transferTodo(tId, "todo");
  };

  const dragDroppedInProgress = (e) => {
    e.preventDefault();
    console.log("You have dropped In Progress");
    const tId = e.dataTransfer.getData("tId");
    console.log("tId", tId);
    transferTodo(tId, "in-progress");
  };

  const dragDroppedInCompleted = (e) => {
    e.preventDefault();
    console.log("You have dropped completed");
    const tId = e.dataTransfer.getData("tId");
    console.log("tId", tId);
    transferTodo(tId, "done");
  };

  const handleEdit = (id) => {
    const { title } = todos.find((todo) => todo.id == id);
    inputElement.current.focus();
    setTodo(title);
    setEditId(id);
  };

  const handleDelete = (id) => {
    // setTodos(todos.filter((todo) => todo.id != id));
    if (id == editId) {
      setTodo("");
      setEditId(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
    } else {
      if (!todo) {
        alert("Please Write Something first!");
        return;
      }
      dispatch(AddTodoAction(todo));
    }
    setTodo("");
  };

  return {
    todos,
    todo,
    setTodo,
    editId,
    inputElement,
    dragStarted,
    draggingOverInTodo,
    draggingOverInProgress,
    draggingOverInCompleted,
    dragDroppedInTodo,
    dragDroppedInProgress,
    dragDroppedInCompleted,
    handleEdit,
    handleDelete,
    handleSubmit,
  };
}
