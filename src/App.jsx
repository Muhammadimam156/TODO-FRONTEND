import React, { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    const res = await createTodo(todo);
    setTodos([res.data, ...todos]);
  };

  const toggleTodo = async (id, updates) => {
    const res = await updateTodo(id, updates);
    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t._id !== id));
  };

  const editTodo = async (id, updates) => {
  const res = await updateTodo(id, updates);
  setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          📝 Todo App
        </h1>
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={removeTodo} onEdit={editTodo} />
      </div>
    </div>
  );
}

export default App;
