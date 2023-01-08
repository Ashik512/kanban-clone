import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddTodoAction,
  deleteTodo,
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
    e.dataTransfer.setData("tId", id);
  };

  const draggingOver = (e) => {
    e.preventDefault();
  };

  const dragDroppedInTodo = (e) => {
    e.preventDefault();
    const tId = e.dataTransfer.getData("tId");
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
      dispatch(deleteTodo(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId && todo.trim() != "") {
      dispatch(
        updateTodo({
          id: editId,
          title: todo,
        })
      );
      setEditId(null);
    } else {
      if (!todo || todo.trim() == "") {
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
    draggingOver,
    dragDroppedInTodo,
    dragDroppedInProgress,
    dragDroppedInCompleted,
    handleEdit,
    handleDelete,
    handleSubmit,
  };
}
