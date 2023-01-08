import "./App.css";
import Kanban from "./components/Kanban";
import TodoAdd from "./components/TodoAdd";
import useTodo from "./hooks/useTodo";

function App() {
  const {
    handleSubmit,
    editId,
    todos,
    todo,
    setTodo,
    inputElement,
    handleDelete,
    handleEdit,
    dragStarted,
    draggingOver,
    dragDroppedInTodo,
    dragDroppedInProgress,
    dragDroppedInCompleted,
  } = useTodo();

  return (
    <div className="app">
      {/* Add Todo input field */}
      <TodoAdd
        handleSubmit={handleSubmit}
        editId={editId}
        todo={todo}
        setTodo={setTodo}
        inputElement={inputElement}
      />
      <Kanban
        todos={todos}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        dragStarted={dragStarted}
        draggingOver={draggingOver}
        dragDroppedInTodo={dragDroppedInTodo}
        dragDroppedInProgress={dragDroppedInProgress}
        dragDroppedInCompleted={dragDroppedInCompleted}
      />
    </div>
  );
}

export default App;
