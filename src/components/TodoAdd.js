import React from "react";

function TodoAdd({ handleSubmit, todo, setTodo, editId, inputElement }) {
  return (
    <div className="input">
      <form onSubmit={handleSubmit}>
        <input
          className="text"
          type="text"
          value={todo}
          ref={inputElement}
          onChange={(e) => setTodo(e.target.value)}
        />
        &nbsp;
        <button className="add" type="submit">
          {editId ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default TodoAdd;
