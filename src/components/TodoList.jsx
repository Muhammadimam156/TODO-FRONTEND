import React from "react";
import PropTypes from 'prop-types';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
    const [editingId, setEditingId] = React.useState(null);
    const [editFormData, setEditFormData] = React.useState({ title: '', description: '' });

    if (!todos.length) {
        return <p className="text-gray-500 text-center mt-5">No todos yet 😴</p>;
    }

    const handleSave = (id) => {
        if (editFormData.title.trim() && editFormData.description.trim()) {
            onEdit(id, editFormData);
            setEditingId(null);
            setEditFormData({ title: '', description: '' });
        }
    };

    const handleEdit = (todo) => {
        setEditingId(todo._id);
        setEditFormData({ title: todo.title, description: todo.description });
    };

    return (
        <ul className="mt-4 space-y-4">
            {todos.map((todo) => (
                <li
                    key={todo._id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
                >
                    {editingId === todo._id ? (
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={editFormData.title}
                                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                className="w-full p-2 border rounded-md"
                            />
                            <input
                                type="text"
                                value={editFormData.description}
                                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                className="w-full p-2 border rounded-md"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handleSave(todo._id)}
                                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => onToggle(todo._id, { completed: !todo.completed })}
                                    className="w-5 h-5 accent-blue-600"
                                />
                                <div>
                                    <p className={`text-lg ${todo.completed ? "line-through text-gray-400" : ""}`}>
                                        {todo.title}
                                    </p>
                                    <p className="text-sm text-gray-500">{todo.description}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(todo)}
                                    className="text-blue-500 hover:text-blue-700 text-xl"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => onDelete(todo._id)}
                                    className="text-red-500 hover:text-red-700 text-xl"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default TodoList;
