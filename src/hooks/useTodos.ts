import { useState, useEffect } from "react";
import type { Todo } from "../models/types";

export function useTodos() {
  const KEY = "todos";
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem(KEY);
    if (!stored){
 return [];
    }

    try {
      const parsed = JSON.parse(stored) as Array<{
        id: string;
        title: string;
        completed: boolean;
        createdAt: string;
      }>;

      return parsed.map((todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const serializable = todos.map((todo) => ({
      ...todo,
      createdAt: todo.createdAt.toISOString(),
    }));
    localStorage.setItem(KEY, JSON.stringify(serializable));
  }, [todos]);

  function addTodo(title: string): void {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
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