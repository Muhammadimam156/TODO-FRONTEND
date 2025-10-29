import React, { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description, completed: false });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-white p-4 rounded-2xl shadow-md"
    >
      <input
        type="text"
        placeholder="Enter todo title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
