import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddTodoAction,
  deleleTodo,
  transferTodo,
  updateTodo,
} from "../redux/actions/todoActions";

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

  const dragDroppedInTodo = (e) => {
    e.preventDefault();
    console.log("You have dropped In Todo");
    const tId = e.dataTransfer.getData("tId");
    console.log("tId", tId);
    // tranfering todo
    dispatch(
      transferTodo({
        id: tId,
        status: "todo",
      })
    );
  };

  const dragDroppedInProgress = (e) => {
    e.preventDefault();
    console.log("You have dropped In Progress");
    const tId = e.dataTransfer.getData("tId");
    console.log("tId", tId);
    // tranfering todo
    dispatch(
      transferTodo({
        id: tId,
        status: "progress",
      })
    );
  };

  const dragDroppedInCompleted = (e) => {
    e.preventDefault();
    console.log("You have dropped completed");
    const tId = e.dataTransfer.getData("tId");
    console.log("tId", tId);
    dispatch(
      transferTodo({
        id: tId,
        status: "done",
      })
    );
  };

  const handleEdit = (id) => {
    const { title } = todos.find((todo) => todo.id == id);
    inputElement.current.focus();
    setTodo(title);
    setEditId(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete ?")) {
      // if user deleted selected todo
      if (id == editId) {
        setTodo("");
        setEditId(null);
      }
      //deleting from redux store
      dispatch(deleleTodo(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(
        updateTodo({
          id: editId,
          title: todo,
        })
      );
      setEditId(null);
    } else {
      if (!todo) {
        alert("Please Write Something first!");
        return;
      }
      dispatch(AddTodoAction(todo));
    }
    setTodo("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
