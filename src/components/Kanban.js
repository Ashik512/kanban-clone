import React from "react";
import Todo from "./Todo";

function Kanban({
  todos,
  handleEdit,
  handleDelete,
  dragStarted,
  draggingOver,
  dragDroppedInTodo,
  dragDroppedInProgress,
  dragDroppedInCompleted,
}) {
  return (
    <div className="todo">
      {/* Todo */}
      <div
        onDragOver={(e) => draggingOver(e)}
        onDrop={(e) => dragDroppedInTodo(e)}
      >
        <span>Todo</span>
        {todos?.map(
          (data, index) =>
            data.status === "todo" && (
              <Todo
                key={index}
                todo={data}
                dragStarted={dragStarted}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                className="in-todo"
              />
            )
        )}
      </div>
      {/* In progress */}
      <div
        onDragOver={(e) => draggingOver(e)}
        onDrop={(e) => dragDroppedInProgress(e)}
      >
        <span>In Progress</span>
        {todos?.map(
          (data, index) =>
            data.status === "progress" && (
              <Todo
                key={index}
                todo={data}
                dragStarted={dragStarted}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                className="progress"
              />
            )
        )}
      </div>
      {/* Completed */}
      <div
        onDragOver={(e) => draggingOver(e)}
        onDrop={(e) => dragDroppedInCompleted(e)}
      >
        <span>Completed</span>
        {todos?.map(
          (data, index) =>
            data.status === "done" && (
              <Todo
                key={index}
                todo={data}
                dragStarted={dragStarted}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                className="done"
              />
            )
        )}
      </div>
    </div>
  );
}

export default Kanban;
