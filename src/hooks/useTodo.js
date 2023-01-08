import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import uuid4 from "uuid4";
import datas from "../datas/mockData";

export default function useTodo() {
  const [todos, setTodos] = useState(datas);
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const inputElement = useRef();
  const dispatch = useDispatch();

  function dragStarted(e, id) {
    console.log("drag started with Id: ", id);
    e.dataTransfer.setData("tId", id);
  }

  function draggingOverInTodo(e) {
    e.preventDefault();
    console.log("Draging over In Todo");
  }

  function draggingOverInProgress(e) {
    e.preventDefault();
    console.log("Draging over In Progress");
  }

  function draggingOverInCompleted(e) {
    e.preventDefault();
    console.log("Draging over In Completed");
  }

  function transferTodo(id, status) {
    setTodos(
      todos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            status: status,
          };
        } else {
          return todo;
        }
      })
    );
  }

  function dragDroppedInTodo(e) {
    e.preventDefault();
    console.log("You have dropped In Todo");
    const tId = e.dataTransfer.getData("tId");
    console.log("tId", tId);
    transferTodo(tId, "todo");
  }

  function dragDroppedInProgress(e) {
    e.preventDefault();
    console.log("You have dropped In Progress");
    const tId = e.dataTransfer.getData("tId");
    console.log("tId", tId);
    transferTodo(tId, "in-progress");
  }

  function dragDroppedInCompleted(e) {
    e.preventDefault();
    console.log("You have dropped completed");
    const tId = e.dataTransfer.getData("tId");
    console.log("tId", tId);
    transferTodo(tId, "done");
  }

  function handleEdit(id) {
    const { title } = todos.find((todo) => todo.id == id);
    inputElement.current.focus();
    setTodo(title);
    setEditId(id);
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id != id));
    if (id == editId) {
      setTodo("");
      setEditId(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      setTodos(
        todos.map((t) => {
          if (t.id == editId) {
            return {
              ...t,
              title: todo,
            };
          } else {
            return t;
          }
        })
      );
      setEditId(null);
    } else {
      if (!todo) {
        alert("Please Write Something first!");
        return;
      }
      setTodos([
        ...todos,
        {
          id: uuid4(),
          title: todo,
          status: "todo",
        },
      ]);
    }
    setTodo("");
  }

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
