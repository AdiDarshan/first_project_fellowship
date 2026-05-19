import { useState } from "react";
import type { Todo } from "../models/Todo";

export function useTodos() {

const [todos, setTodos] = useState<Todo[]>([]);


function addTodo(title: string): void {
  const newTodo: Todo = {
    id: crypto.randomUUID(), // or Date.now().toString()
    title,
    completed: false,
    createdAt: new Date(),
  };

  setTodos((prevTodos) => [...prevTodos, newTodo]);
}

function toggleTodo(id: string): void {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  );
}

function deleteTodo(id: string): void {
  setTodos((prevTodos) =>
    prevTodos.filter((todo) => todo.id !== id)
  );
}


  function editTodo(id: string, newTitle: string): void {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === id
        ? { ...todo, title: newTitle }
        : todo
    )
  );
}

function clearCompleted(): void {
  setTodos((prevTodos) =>
    prevTodos.filter((todo) => !todo.completed)
  );
}

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
      editTodo,
      clearCompleted,
  };

}