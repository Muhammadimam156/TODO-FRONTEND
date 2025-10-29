import axios from "axios";

const API = axios.create({
  baseURL: "https://todo-backend-eta-lac.vercel.app/api/todos", 
});

export const getTodos = () => API.get("/");
export const createTodo = (data) => API.post("/", data);
export const updateTodo = (id, data) => API.put(`/${id}`, data);
export const deleteTodo = (id) => API.delete(`/${id}`);
