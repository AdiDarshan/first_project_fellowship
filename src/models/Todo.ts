// src/types/todo.ts
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export type Filter = "all" | "active" | "completed";
