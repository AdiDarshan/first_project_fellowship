import { useState, useEffect } from "react";
import type { Todo } from "../models/types";

// custom hook to manage the todos
export function useTodos() {
  // state to store the todos
  const [todos, setTodos] = useState<Todo[]>(() => {
    // get the todos from the local storage
    const stored = localStorage.getItem("todos");
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored) as Array<{
        id: string;
        title: string;
        completed: boolean;
        createdAt: string;
      }>;

      return parsed.map((t) => ({
        ...t,
        createdAt: new Date(t.createdAt),
      }));
    } catch {
      return [];
    }
  });

  // save the todos to the local storage
  useEffect(() => {
    const serializable = todos.map((t) => ({
      ...t,
      createdAt: t.createdAt.toISOString(),
    }));
    localStorage.setItem("todos", JSON.stringify(serializable));
  }, [todos]);

  // add a todo to the list
  function addTodo(title: string): void {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  // change a todo's completion status
  function toggleTodo(id: string): void {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  // delete a todo from the list
  function deleteTodo(id: string): void {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  }

  // edit a todo's title
  function editTodo(id: string, newTitle: string): void {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, title: newTitle }
          : todo
      )
    );
  }

  // clear all completed todos
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