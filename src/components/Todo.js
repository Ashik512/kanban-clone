import React from "react";

function Todo({ todo, dragStarted, handleEdit, handleDelete, className }) {
  return (
    <div
      className={`card ${className}`}
      draggable
      onDragStart={(e) => dragStarted(e, todo.id)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "3px",
          padding: "3px",
        }}
      >
        <span>{todo.title}</span>
        <div>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(todo.id)}
          >
            Edit
          </button>
          &nbsp;
          <button
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
